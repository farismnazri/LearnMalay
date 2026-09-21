import { inspectPrivacyRetention, runPrivacyRetention } from "../src/server/privacyRetention.ts";

async function main() {
  if (!process.env.MONGODB_URI?.trim()) {
    throw new Error("A verified MONGODB_URI is required; refusing the in-memory fallback.");
  }

  const execute = process.argv.includes("--execute");
  if (execute && process.env.PRIVACY_RETENTION_APPROVED !== "1") {
    throw new Error("Set PRIVACY_RETENTION_APPROVED=1 only after the retention schedule and live job are approved.");
  }

  const result = execute ? await runPrivacyRetention() : await inspectPrivacyRetention();
  console.info(JSON.stringify({ mode: execute ? "execute" : "dry-run", ...result }));
}

main().catch((error: unknown) => {
  console.error("Privacy retention job failed", error instanceof Error ? error.message : "unknown error");
  process.exitCode = 1;
});
