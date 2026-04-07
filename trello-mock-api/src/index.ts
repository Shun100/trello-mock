import express from "express";
import { pool } from "./connectionPool.js";
import { readConfig } from "./utils.js";

const app = express();
const PORT = Number.parseInt(readConfig('SERVER_PORT')) ?? 8888;

/**
 * DB接続確認
 */
export const checkDBConnection = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ DB connected');
  } catch (err) {
    console.error('❌ DB connection failed', err);
    process.exit(1);
  }
}

/**
 * サーバ起動
 */
export const startServer = () => {
  try {
    app.listen(PORT, () => console.log(`✅ Server has started at port ${PORT}`));
  } catch (err) {
    console.error('❌ Server failed to start', err);
    process.exit(1);
  }
}

checkDBConnection().then(() => {
  startServer();
});