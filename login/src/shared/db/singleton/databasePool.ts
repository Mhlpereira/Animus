import { Pool } from "pg";
import { config } from "dotenv";

config();

export const DatabasePool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB,
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  ssl: process.env.POSTGRES_SSL === "true",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

DatabasePool.on("error", (e) => {
  console.error("Error in Postgres instance:", e);
});
