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

type GlobalMongoCache = typeof globalThis & {
  __learnMalayMongoClientPromise?: Promise<MongoClient>;
  __learnMalayMongoIndexesPromise?: Promise<void>;
};

const globalCache = globalThis as GlobalMongoCache;
const DEFAULT_DB_NAME = "learnmalay";

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to your environment variables.");
  }
  return uri;
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
  if (!globalCache.__learnMalayMongoClientPromise) {
    const uri = getMongoUri();
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
  const client = await getClient();
  const uri = getMongoUri();
  return client.db(resolveDbName(uri));
}

async function ensureIndexes(db: Db): Promise<void> {
  const users = db.collection<UserDocument>("users");
  const appMeta = db.collection<AppMetaDocument>("app_meta");
  const highscores = db.collection<HighscoreDocument>("highscores");

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
  ]);
}

export async function getCollections() {
  const db = await getDb();

  if (!globalCache.__learnMalayMongoIndexesPromise) {
    globalCache.__learnMalayMongoIndexesPromise = ensureIndexes(db).catch((error) => {
      globalCache.__learnMalayMongoIndexesPromise = undefined;
      throw error;
    });
  }
  await globalCache.__learnMalayMongoIndexesPromise;

  return {
    users: db.collection<UserDocument>("users"),
    appMeta: db.collection<AppMetaDocument>("app_meta"),
    highscores: db.collection<HighscoreDocument>("highscores"),
  };
}

export type { UserDocument, AppMetaDocument, HighscoreDocument };
