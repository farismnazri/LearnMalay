import { NextResponse } from "next/server";
import { isAllowedMutationOrigin } from "./requestOriginPolicy";

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function enforceSameOriginMutation(req: Request): NextResponse | null {
  if (!MUTATING_METHODS.has(req.method.toUpperCase())) return null;
  if (isAllowedMutationOrigin(req)) return null;
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
