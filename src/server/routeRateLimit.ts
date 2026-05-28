type RouteRateLimitBucket = {
  windowStartedAt: number;
  windowMs: number;
  hits: number;
};

type RouteRateLimitInput = {
  scope: string;
  req: Request;
  subject?: string | null;
  windowMs: number;
  maxHits: number;
};

const MAX_BUCKETS = 40_000;
const CLEANUP_INTERVAL_MS = 60_000;

const routeBuckets = new Map<string, RouteRateLimitBucket>();
let lastCleanupAt = 0;

export const GENERIC_ROUTE_RATE_LIMIT_MESSAGE = "Too many requests. Please try again later.";
// TODO(security): This is an in-process limiter. Move to shared/distributed storage for multi-instance production.

function nowMs() {
  return Date.now();
}

function normalizeSubject(subject: string | null | undefined): string {
  const normalized = (subject ?? "").trim().toUpperCase();
  return normalized || "ANON";
}

function resolveClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const cfIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  return "unknown";
}

function cleanupBuckets(now: number): void {
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;
  lastCleanupAt = now;

  for (const [key, bucket] of routeBuckets) {
    const expiresAt = bucket.windowStartedAt + bucket.windowMs * 3;
    if (expiresAt < now) routeBuckets.delete(key);
  }

  if (routeBuckets.size <= MAX_BUCKETS) return;

  let overflow = routeBuckets.size - MAX_BUCKETS;
  for (const key of routeBuckets.keys()) {
    routeBuckets.delete(key);
    overflow -= 1;
    if (overflow <= 0) break;
  }
}

function buildBucketKey(scope: string, req: Request, subject?: string | null): string {
  return `${scope}:${resolveClientIp(req)}:${normalizeSubject(subject)}`;
}

function getOrCreateBucket(key: string, now: number, windowMs: number): RouteRateLimitBucket {
  const existing = routeBuckets.get(key);
  if (!existing) {
    const created: RouteRateLimitBucket = {
      windowStartedAt: now,
      windowMs,
      hits: 0,
    };
    routeBuckets.set(key, created);
    return created;
  }

  if (now - existing.windowStartedAt >= existing.windowMs || existing.windowMs !== windowMs) {
    existing.windowStartedAt = now;
    existing.windowMs = windowMs;
    existing.hits = 0;
  }

  return existing;
}

export function checkRouteRateLimit(input: RouteRateLimitInput): {
  key: string;
  limited: boolean;
  retryAfterSeconds: number;
} {
  const now = nowMs();
  cleanupBuckets(now);

  const windowMs = Math.max(1, Math.floor(input.windowMs));
  const maxHits = Math.max(1, Math.floor(input.maxHits));
  const key = buildBucketKey(input.scope, input.req, input.subject);
  const bucket = getOrCreateBucket(key, now, windowMs);

  if (bucket.hits >= maxHits) {
    const retryAfterMs = bucket.windowStartedAt + bucket.windowMs - now;
    return {
      key,
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
    };
  }

  bucket.hits += 1;
  return { key, limited: false, retryAfterSeconds: 0 };
}
