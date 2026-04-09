import { Pool } from "pg";
import { readConfig } from "./config.js";

// PostgreSQLの接続プール（接続管理）
export const pool = new Pool({
  host: readConfig('DB_HOST'),
  port: Number.parseInt(readConfig('DB_PORT')) ?? 5432,
  user: readConfig('DB_USER'),
  password: readConfig('DB_PASSWORD'),
  database: readConfig('DB_NAME'),
  max: Number.parseInt(readConfig('DB_MAX_CONNECTIONS')) ?? 10, // 同時接続数 指定しなければデフォルトで10に設定される
});

