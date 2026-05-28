const TRUSTED_FETCH_SITE_VALUES = new Set(["same-origin", "same-site", "none"]);

function readHeaderFirstValue(headers: Headers, name: string): string | null {
  const raw = headers.get(name);
  if (!raw) return null;
  const first = raw.split(",")[0]?.trim();
  return first || null;
}

function normalizeOrigin(value: string): string | null {
  try {
    return new URL(value).origin.toLowerCase();
  } catch {
    return null;
  }
}

function resolveExpectedOrigins(req: Request): Set<string> {
  const out = new Set<string>();

  try {
    out.add(new URL(req.url).origin.toLowerCase());
  } catch {
    // Ignore malformed URL fallback.
  }

  const host =
    readHeaderFirstValue(req.headers, "x-forwarded-host") ??
    readHeaderFirstValue(req.headers, "host");
  if (!host) return out;

  const fromUrlProtocol = (() => {
    try {
      return new URL(req.url).protocol.replace(/:$/, "");
    } catch {
      return "";
    }
  })();
  const proto = readHeaderFirstValue(req.headers, "x-forwarded-proto") ?? fromUrlProtocol;
  if (!proto) return out;

  const candidate = normalizeOrigin(`${proto}://${host}`);
  if (candidate) out.add(candidate);

  return out;
}

export function isAllowedMutationOrigin(req: Request): boolean {
  const originHeader = req.headers.get("origin");
  const fetchSite = req.headers.get("sec-fetch-site")?.trim().toLowerCase();

  if (!originHeader) {
    // Browser CSRF attempts should include a cross-site fetch hint or Origin.
    // Allow missing Origin for non-browser or same-origin traffic.
    if (!fetchSite) return true;
    return TRUSTED_FETCH_SITE_VALUES.has(fetchSite);
  }

  const normalizedOrigin = normalizeOrigin(originHeader);
  if (!normalizedOrigin) return false;

  return resolveExpectedOrigins(req).has(normalizedOrigin);
}

