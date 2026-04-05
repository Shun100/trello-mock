import { Pool } from "pg";

// PostgreSQLの接続プール（接続管理）
// デフォルトは最大10接続
export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
  max: 10,
});