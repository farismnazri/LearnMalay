type RateLimitBucket = {
  windowStartedAt: number;
  failures: number;
  blockedUntil: number;
};

type AdminAuditEvent = {
  action: "login" | "switch-user" | "verify-admin-password" | "rotate-admin-password";
  success: boolean;
  req: Request;
  actorId?: string | null;
  targetUserId?: string | null;
  reason?: string;
};

const AUTH_WINDOW_MS = 10 * 60 * 1000; // 10 min rolling window
const AUTH_MAX_FAILURES = 8;
const AUTH_BLOCK_MS = 5 * 60 * 1000; // 5 min cooldown
const MAX_BUCKETS = 20000;
const CLEANUP_INTERVAL_MS = 60 * 1000;

const buckets = new Map<string, RateLimitBucket>();
let lastCleanupAt = 0;

export const GENERIC_AUTH_FAILURE_MESSAGE = "Invalid credentials.";
export const GENERIC_RATE_LIMIT_MESSAGE = "Too many attempts. Please try again later.";

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

function cleanupBuckets(now: number) {
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;
  lastCleanupAt = now;

  const staleBefore = now - Math.max(AUTH_WINDOW_MS, AUTH_BLOCK_MS) * 3;
  for (const [key, bucket] of buckets) {
    const bucketLastSeen = Math.max(bucket.windowStartedAt, bucket.blockedUntil);
    if (bucket.failures <= 0 && bucket.blockedUntil <= now) {
      buckets.delete(key);
      continue;
    }
    if (bucketLastSeen < staleBefore) {
      buckets.delete(key);
    }
  }

  if (buckets.size <= MAX_BUCKETS) return;
  let overflow = buckets.size - MAX_BUCKETS;
  for (const key of buckets.keys()) {
    buckets.delete(key);
    overflow -= 1;
    if (overflow <= 0) break;
  }
}

function buildBucketKey(scope: string, req: Request, subject: string | null | undefined): string {
  return `${scope}:${resolveClientIp(req)}:${normalizeSubject(subject)}`;
}

function getOrCreateBucket(key: string, now: number): RateLimitBucket {
  const existing = buckets.get(key);
  if (!existing) {
    const created: RateLimitBucket = {
      windowStartedAt: now,
      failures: 0,
      blockedUntil: 0,
    };
    buckets.set(key, created);
    return created;
  }

  if (now - existing.windowStartedAt > AUTH_WINDOW_MS) {
    existing.windowStartedAt = now;
    existing.failures = 0;
  }

  return existing;
}

export function checkAuthRateLimit(scope: string, req: Request, subject?: string | null): {
  key: string;
  limited: boolean;
  retryAfterSeconds: number;
} {
  const now = nowMs();
  cleanupBuckets(now);

  const key = buildBucketKey(scope, req, subject);
  const bucket = getOrCreateBucket(key, now);

  if (bucket.blockedUntil > now) {
    return {
      key,
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.blockedUntil - now) / 1000)),
    };
  }

  return { key, limited: false, retryAfterSeconds: 0 };
}

export function recordAuthFailure(rateLimitKey: string): void {
  const now = nowMs();
  cleanupBuckets(now);

  const bucket = getOrCreateBucket(rateLimitKey, now);
  bucket.failures += 1;

  if (bucket.failures >= AUTH_MAX_FAILURES) {
    bucket.blockedUntil = now + AUTH_BLOCK_MS;
    bucket.windowStartedAt = now;
    bucket.failures = 0;
  }
}

export function recordAuthSuccess(rateLimitKey: string): void {
  buckets.delete(rateLimitKey);
}

export function logAdminAudit(event: AdminAuditEvent): void {
  const actor = normalizeSubject(event.actorId);
  const target = normalizeSubject(event.targetUserId);
  const record = {
    ts: new Date().toISOString(),
    action: event.action,
    success: event.success,
    actor,
    target,
    ip: resolveClientIp(event.req),
    reason: event.reason ?? "",
  };

  console.info(`[admin-audit] ${JSON.stringify(record)}`);
}
