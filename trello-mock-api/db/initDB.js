import fs from 'fs';
import { pool } from "./connectionPool.js";

/**
 * DB初期化
 */
async function initDB() {
  try {
    console.log('Initializing database...');

    // schema.sql を読み込む
    const sql = fs.readFileSync('./schema.sql', 'utf-8');

    // 実行
    await pool.query(sql);

    console.log('Database initialized successfully!');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await pool.end();
  }
}

initDB();