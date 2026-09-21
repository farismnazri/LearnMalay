// Provisional operator choice. Do not describe this as enforced in production
// until the maintenance job and provider configuration are verified.
export const RAW_ACTIVITY_RETENTION_DAYS = 90;

export function rawActivityCutoff(now = new Date()): string {
  return new Date(now.getTime() - RAW_ACTIVITY_RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();
}
