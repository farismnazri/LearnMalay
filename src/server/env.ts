type EnvMap = Record<string, string | undefined>;

export const REQUIRED_PRODUCTION_ENV_VARS = [
  "MONGODB_URI",
  "LEARN_MALAY_ADMIN_PASSWORD",
] as const;

const MIN_PRODUCTION_PASSWORD_LENGTH = 12;
const SUPPORTED_MONGODB_PROTOCOLS = new Set(["mongodb:", "mongodb+srv:"]);

const INSECURE_PASSWORDS = new Map<string, Set<string>>([
  ["LEARN_MALAY_ADMIN_PASSWORD", new Set(["admin", "password", "learnmalay", "learn-malay"])],
  ["LEARN_MALAY_DEMO_PASSWORD", new Set(["demomode", "demo", "password", "learnmalay", "learn-malay"])],
]);

export class ProductionEnvValidationError extends Error {
  readonly details: string[];

  constructor(details: string[]) {
    super(`Invalid production environment:\n- ${details.join("\n- ")}`);
    this.name = "ProductionEnvValidationError";
    this.details = details;
  }
}

function readEnv(env: EnvMap, name: string): string | null {
  const value = env[name]?.trim();
  return value ? value : null;
}

function isProduction(env: EnvMap): boolean {
  return env.NODE_ENV === "production";
}

function validateMongoUri(uri: string): string[] {
  const errors: string[] = [];
  let parsed: URL;

  try {
    parsed = new URL(uri);
  } catch {
    return ["MONGODB_URI must be a valid MongoDB connection string."];
  }

  if (!SUPPORTED_MONGODB_PROTOCOLS.has(parsed.protocol)) {
    errors.push("MONGODB_URI must use the mongodb:// or mongodb+srv:// protocol.");
  }

  if (!parsed.host) {
    errors.push("MONGODB_URI must include a database host.");
  }

  return errors;
}

function validateProductionPassword(name: string, value: string): string[] {
  const errors: string[] = [];
  const lowered = value.toLowerCase();
  const insecureValues = INSECURE_PASSWORDS.get(name) ?? new Set<string>();

  if (value.length < MIN_PRODUCTION_PASSWORD_LENGTH) {
    errors.push(`${name} must be at least ${MIN_PRODUCTION_PASSWORD_LENGTH} characters in production.`);
  }

  if (insecureValues.has(lowered)) {
    errors.push(`${name} must not use a development/default password in production.`);
  }

  return errors;
}

export function getProductionEnvValidationErrors(env: EnvMap = process.env): string[] {
  if (!isProduction(env)) return [];

  const errors: string[] = [];
  const mongoUri = readEnv(env, "MONGODB_URI");
  const adminPassword = readEnv(env, "LEARN_MALAY_ADMIN_PASSWORD");
  const demoPassword = readEnv(env, "LEARN_MALAY_DEMO_PASSWORD");

  if (!mongoUri) {
    errors.push("MONGODB_URI is required in production; in-memory storage is development-only.");
  } else {
    errors.push(...validateMongoUri(mongoUri));
  }

  if (!adminPassword) {
    errors.push("LEARN_MALAY_ADMIN_PASSWORD is required in production.");
  } else {
    errors.push(...validateProductionPassword("LEARN_MALAY_ADMIN_PASSWORD", adminPassword));
  }

  if (demoPassword) {
    errors.push(...validateProductionPassword("LEARN_MALAY_DEMO_PASSWORD", demoPassword));
  }

  if (adminPassword && demoPassword && adminPassword === demoPassword) {
    errors.push("LEARN_MALAY_DEMO_PASSWORD must differ from LEARN_MALAY_ADMIN_PASSWORD in production.");
  }

  return errors;
}

export function assertValidProductionEnv(env: EnvMap = process.env): void {
  const errors = getProductionEnvValidationErrors(env);
  if (errors.length > 0) {
    throw new ProductionEnvValidationError(errors);
  }
}
