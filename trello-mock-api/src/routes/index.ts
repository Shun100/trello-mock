import express from "express";
import cors from "cors";
import { readConfig } from "../utils/config.js";
import { pool } from "../utils/connectionPool.js";
import * as listRepository from "../repository/listRepository.js";

const app = express();
app.use(express.json());
// CORS対策 フロントエンドがポート番号5173, バックエンドが8888で異なるため、CORSの警告が出る
app.use(cors({
  origin: readConfig('CORS_ORIGINS').split(',') ?? []
}));
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

/**
 * リスト登録
 */
app.post('/lists', async (req, res) => {
  const { title } = req.body;
  try {
    const result = await listRepository.save(title);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '保存に失敗しました' });
  }
});

checkDBConnection().then(() => {
  startServer();
});