import { MongoClient, type Db } from "mongodb";

type UserDocument = {
  id: string;
  name: string;
  avatar_id: string | null;
  is_admin: boolean;
  progress_chapter: number;
  progress_page: number;
  password_hash: string | null;
  password_salt: string | null;
  password_algo: string | null;
  created_at: string;
};

type AppMetaDocument = {
  key: string;
  value: string;
  updated_at: string;
};

type HighscoreDocument = {
  id: string;
  game_id: string;
  name: string;
  avatar_id: string | null;
  accuracy: number;
  time_ms: number;
  date_iso: string;
  meta_json: string | null;
  difficulty_weight: number;
  created_at: string;
};

type SessionDocument = {
  id: string;
  user_id: string;
  created_at: number;
  last_seen_at: number;
  expires_at: number;
};

type Primitive = string | number | boolean | null | undefined;

type QueryOperatorValue = {
  $ne?: Primitive;
  $exists?: boolean;
  $in?: Primitive[];
};

type QueryValue = Primitive | QueryOperatorValue;

type Query<T extends Record<string, unknown>> = Partial<Record<keyof T, QueryValue>> & {
  $or?: Array<Query<T>>;
};

type Projection<T extends Record<string, unknown>> = Partial<Record<keyof T, 0 | 1>>;
type Sort<T extends Record<string, unknown>> = Partial<Record<keyof T, 1 | -1>>;

type FindOptions<T extends Record<string, unknown>> = {
  projection?: Projection<T>;
  sort?: Sort<T>;
  skip?: number;
};

type Update<T extends Record<string, unknown>> = {
  $set: Partial<T>;
};

type CollectionLike<T extends Record<string, unknown>> = {
  createIndex(index: Sort<T>, options?: { unique?: boolean; name?: string }): Promise<void>;
  findOne(filter: Query<T>, options?: { projection?: Projection<T> }): Promise<T | null>;
  insertOne(doc: T): Promise<void>;
  updateOne(filter: Query<T>, update: Update<T>, options?: { upsert?: boolean }): Promise<void>;
  updateMany(filter: Query<T>, update: Update<T>): Promise<void>;
  find(filter?: Query<T>, options?: FindOptions<T>): { toArray(): Promise<T[]> };
  deleteOne(filter: Query<T>): Promise<void>;
  deleteMany(filter: Query<T>): Promise<void>;
};

type AppCollections = {
  users: CollectionLike<UserDocument>;
  appMeta: CollectionLike<AppMetaDocument>;
  highscores: CollectionLike<HighscoreDocument>;
  sessions: CollectionLike<SessionDocument>;
};

class DuplicateKeyError extends Error {
  code = 11000;
}

function cloneValue<T>(value: T): T {
  return structuredClone(value);
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function isOperatorValue(value: unknown): value is QueryOperatorValue {
  if (!value || typeof value !== "object") return false;
  const record = asRecord(value);
  return "$ne" in record || "$exists" in record || "$in" in record;
}

function compareUnknown(a: unknown, b: unknown): number {
  if (a === b) return 0;
  if (a === undefined || a === null) return -1;
  if (b === undefined || b === null) return 1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  const left = String(a);
  const right = String(b);
  return left < right ? -1 : 1;
}

function matchesValue(value: unknown, condition: QueryValue): boolean {
  if (isOperatorValue(condition)) {
    if (Array.isArray(condition.$in) && !condition.$in.some((item) => item === value)) return false;
    if ("$exists" in condition) {
      const exists = value !== undefined;
      if (Boolean(condition.$exists) !== exists) return false;
    }
    if ("$ne" in condition && value === condition.$ne) return false;
    return true;
  }
  return value === condition;
}

function matchesQuery<T extends Record<string, unknown>>(doc: T, filter: Query<T>): boolean {
  for (const [rawKey, rawCondition] of Object.entries(filter)) {
    if (rawKey === "$or") {
      const orConditions = Array.isArray(rawCondition) ? rawCondition : [];
      if (orConditions.length === 0) return false;
      if (!orConditions.some((condition) => matchesQuery(doc, condition as Query<T>))) return false;
      continue;
    }

    const key = rawKey as keyof T;
    if (!matchesValue(doc[key], rawCondition as QueryValue)) return false;
  }
  return true;
}

function applyProjection<T extends Record<string, unknown>>(doc: T, projection?: Projection<T>): T {
  if (!projection || Object.keys(projection).length === 0) return cloneValue(doc);

  const includeKeys = Object.entries(projection)
    .filter(([, value]) => value === 1)
    .map(([key]) => key as keyof T);

  if (includeKeys.length === 0) return cloneValue(doc);

  const out: Partial<T> = {};
  for (const key of includeKeys) {
    if (doc[key] !== undefined) out[key] = cloneValue(doc[key]);
  }
  return out as T;
}

function sortRows<T extends Record<string, unknown>>(rows: T[], sort?: Sort<T>): T[] {
  if (!sort || Object.keys(sort).length === 0) return rows;

  const entries = Object.entries(sort) as Array<[keyof T, 1 | -1]>;
  return rows.sort((left, right) => {
    for (const [key, direction] of entries) {
      const cmp = compareUnknown(left[key], right[key]);
      if (cmp !== 0) return direction === 1 ? cmp : -cmp;
    }
    return 0;
  });
}

function seedFromFilter<T extends Record<string, unknown>>(filter: Query<T>): Partial<T> {
  const out: Partial<T> = {};
  for (const [rawKey, rawValue] of Object.entries(filter)) {
    if (rawKey === "$or") continue;
    if (isOperatorValue(rawValue)) continue;
    out[rawKey as keyof T] = rawValue as T[keyof T];
  }
  return out;
}

class MemoryCollection<T extends Record<string, unknown>> implements CollectionLike<T> {
  private docs: T[] = [];
  private uniqueIndexes: Array<Array<keyof T>> = [];

  async createIndex(index: Sort<T>, options?: { unique?: boolean }): Promise<void> {
    if (!options?.unique) return;
    const fields = Object.keys(index) as Array<keyof T>;
    if (fields.length > 0) this.uniqueIndexes.push(fields);
  }

  private enforceUnique(candidate: T, skipIdx?: number) {
    for (const keys of this.uniqueIndexes) {
      const conflict = this.docs.findIndex((existing, idx) => {
        if (typeof skipIdx === "number" && idx === skipIdx) return false;
        return keys.every((key) => existing[key] === candidate[key]);
      });
      if (conflict !== -1) throw new DuplicateKeyError("Duplicate key");
    }
  }

  async findOne(filter: Query<T>, options?: { projection?: Projection<T> }): Promise<T | null> {
    const found = this.docs.find((doc) => matchesQuery(doc, filter));
    if (!found) return null;
    return applyProjection(found, options?.projection);
  }

  async insertOne(doc: T): Promise<void> {
    const next = cloneValue(doc);
    this.enforceUnique(next);
    this.docs.push(next);
  }

  async updateOne(filter: Query<T>, update: Update<T>, options?: { upsert?: boolean }): Promise<void> {
    const idx = this.docs.findIndex((doc) => matchesQuery(doc, filter));

    if (idx === -1) {
      if (!options?.upsert) return;
      const created = { ...seedFromFilter(filter), ...update.$set } as T;
      this.enforceUnique(created);
      this.docs.push(cloneValue(created));
      return;
    }

    const updated = { ...this.docs[idx], ...update.$set } as T;
    this.enforceUnique(updated, idx);
    this.docs[idx] = cloneValue(updated);
  }

  async updateMany(filter: Query<T>, update: Update<T>): Promise<void> {
    for (let i = 0; i < this.docs.length; i++) {
      if (!matchesQuery(this.docs[i], filter)) continue;
      const updated = { ...this.docs[i], ...update.$set } as T;
      this.enforceUnique(updated, i);
      this.docs[i] = cloneValue(updated);
    }
  }

  find(filter: Query<T> = {}, options?: FindOptions<T>): { toArray(): Promise<T[]> } {
    return {
      toArray: async () => {
        const matched = this.docs.filter((doc) => matchesQuery(doc, filter)).map((doc) => cloneValue(doc));
        const sorted = sortRows(matched, options?.sort);
        const skipped = typeof options?.skip === "number" && options.skip > 0 ? sorted.slice(options.skip) : sorted;
        return skipped.map((doc) => applyProjection(doc, options?.projection));
      },
    };
  }

  async deleteOne(filter: Query<T>): Promise<void> {
    const idx = this.docs.findIndex((doc) => matchesQuery(doc, filter));
    if (idx !== -1) this.docs.splice(idx, 1);
  }

  async deleteMany(filter: Query<T>): Promise<void> {
    if (Object.keys(filter).length === 0) {
      this.docs = [];
      return;
    }
    this.docs = this.docs.filter((doc) => !matchesQuery(doc, filter));
  }
}

type GlobalMongoCache = typeof globalThis & {
  __learnMalayMongoClientPromise?: Promise<MongoClient>;
  __learnMalayMongoIndexesPromise?: Promise<void>;
  __learnMalayMemoryCollections?: AppCollections;
  __learnMalayMemoryIndexesPromise?: Promise<void>;
  __learnMalayMemoryFallbackLogged?: boolean;
};

const globalCache = globalThis as GlobalMongoCache;
const DEFAULT_DB_NAME = "learnmalay";

function getMongoUri(): string | null {
  const uri = process.env.MONGODB_URI?.trim();
  return uri || null;
}

function resolveDbName(uri: string): string {
  const envDbName = process.env.MONGODB_DB_NAME?.trim();
  if (envDbName) return envDbName;

  try {
    const parsed = new URL(uri);
    const pathValue = parsed.pathname.replace(/^\//, "").trim();
    if (pathValue) return decodeURIComponent(pathValue);
  } catch {
    // Fall through to default.
  }

  return DEFAULT_DB_NAME;
}

async function getClient(): Promise<MongoClient> {
  const uri = getMongoUri();
  if (!uri) {
    throw new Error("MONGODB_URI is not set.");
  }

  if (!globalCache.__learnMalayMongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
    });
    globalCache.__learnMalayMongoClientPromise = client.connect().catch((error) => {
      globalCache.__learnMalayMongoClientPromise = undefined;
      throw error;
    });
  }

  return globalCache.__learnMalayMongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const uri = getMongoUri();
  if (!uri) {
    throw new Error("MONGODB_URI is not set.");
  }

  const client = await getClient();
  return client.db(resolveDbName(uri));
}

async function ensureIndexes(db: Db): Promise<void> {
  const users = db.collection<UserDocument>("users");
  const appMeta = db.collection<AppMetaDocument>("app_meta");
  const highscores = db.collection<HighscoreDocument>("highscores");
  const sessions = db.collection<SessionDocument>("sessions");

  await Promise.all([
    users.createIndex({ id: 1 }, { unique: true, name: "idx_users_id_unique" }),
    users.createIndex({ name: 1 }, { name: "idx_users_name" }),
    appMeta.createIndex({ key: 1 }, { unique: true, name: "idx_app_meta_key_unique" }),
    highscores.createIndex({ id: 1 }, { unique: true, name: "idx_highscores_id_unique" }),
    highscores.createIndex({ game_id: 1 }, { name: "idx_highscores_game" }),
    highscores.createIndex(
      { game_id: 1, difficulty_weight: -1, accuracy: -1, time_ms: 1, date_iso: -1 },
      { name: "idx_highscores_sort" }
    ),
    sessions.createIndex({ id: 1 }, { unique: true, name: "idx_sessions_id_unique" }),
    sessions.createIndex({ user_id: 1 }, { name: "idx_sessions_user_id" }),
    sessions.createIndex({ expires_at: 1 }, { name: "idx_sessions_expires_at" }),
  ]);
}

async function ensureMemoryIndexes(collections: AppCollections): Promise<void> {
  await Promise.all([
    collections.users.createIndex({ id: 1 }, { unique: true, name: "idx_users_id_unique" }),
    collections.users.createIndex({ name: 1 }, { name: "idx_users_name" }),
    collections.appMeta.createIndex({ key: 1 }, { unique: true, name: "idx_app_meta_key_unique" }),
    collections.highscores.createIndex({ id: 1 }, { unique: true, name: "idx_highscores_id_unique" }),
    collections.highscores.createIndex({ game_id: 1 }, { name: "idx_highscores_game" }),
    collections.highscores.createIndex(
      { game_id: 1, difficulty_weight: -1, accuracy: -1, time_ms: 1, date_iso: -1 },
      { name: "idx_highscores_sort" }
    ),
    collections.sessions.createIndex({ id: 1 }, { unique: true, name: "idx_sessions_id_unique" }),
    collections.sessions.createIndex({ user_id: 1 }, { name: "idx_sessions_user_id" }),
    collections.sessions.createIndex({ expires_at: 1 }, { name: "idx_sessions_expires_at" }),
  ]);
}

function getMemoryCollections(): AppCollections {
  if (!globalCache.__learnMalayMemoryCollections) {
    globalCache.__learnMalayMemoryCollections = {
      users: new MemoryCollection<UserDocument>(),
      appMeta: new MemoryCollection<AppMetaDocument>(),
      highscores: new MemoryCollection<HighscoreDocument>(),
      sessions: new MemoryCollection<SessionDocument>(),
    };
  }
  return globalCache.__learnMalayMemoryCollections;
}

export async function getCollections(): Promise<AppCollections> {
  const mongoUri = getMongoUri();

  if (!mongoUri) {
    const collections = getMemoryCollections();
    if (!globalCache.__learnMalayMemoryIndexesPromise) {
      globalCache.__learnMalayMemoryIndexesPromise = ensureMemoryIndexes(collections).catch((error) => {
        globalCache.__learnMalayMemoryIndexesPromise = undefined;
        throw error;
      });
    }
    await globalCache.__learnMalayMemoryIndexesPromise;

    if (!globalCache.__learnMalayMemoryFallbackLogged) {
      globalCache.__learnMalayMemoryFallbackLogged = true;
      console.warn(
        "MONGODB_URI is not set. Using in-memory data store for local dev (data resets when server restarts)."
      );
    }
    return collections;
  }

  const db = await getDb();

  if (!globalCache.__learnMalayMongoIndexesPromise) {
    globalCache.__learnMalayMongoIndexesPromise = ensureIndexes(db).catch((error) => {
      globalCache.__learnMalayMongoIndexesPromise = undefined;
      throw error;
    });
  }
  await globalCache.__learnMalayMongoIndexesPromise;

  return {
    users: db.collection<UserDocument>("users") as unknown as CollectionLike<UserDocument>,
    appMeta: db.collection<AppMetaDocument>("app_meta") as unknown as CollectionLike<AppMetaDocument>,
    highscores: db.collection<HighscoreDocument>("highscores") as unknown as CollectionLike<HighscoreDocument>,
    sessions: db.collection<SessionDocument>("sessions") as unknown as CollectionLike<SessionDocument>,
  };
}

export type { UserDocument, AppMetaDocument, HighscoreDocument, SessionDocument };
