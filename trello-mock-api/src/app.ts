import express from "express";
import type { Express } from "express";
import cors from "cors";
import { readConfig } from "./utils/config.js";
import { pool } from "./utils/connectionPool.js";
import listRoutes from "./routes/listRoutes.js";
import { requestError, requestTime, serverError } from "./middlewares/middleWare.js";

// ミドルウェア設定
function setMiddlewares(app: Express) {
  // ミドルウェア設定
  app.use(express.json());
  app.use(requestTime);
  // CORS対策 フロントエンドがポート番号5173, バックエンドが8888で異なるため、CORSの警告が出る
  app.use(cors({ origin: readConfig('CORS_ORIGINS').split(',') ?? [] }));
  app.use('/lists', listRoutes);
  app.use(requestError);
  app.use(serverError);
}

// DB接続確認
async function checkDBConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('✅ DB connected');
  } catch (err) {
    console.error('❌ DB connection failed', err);
    process.exit(1);
  }
}

// サーバ起動
async function startServer(app: Express, port: number) {
  try {
    app.listen(port, () => console.log(`✅ Server has started at port ${port}`));
  } catch (err) {
    console.error('❌ Server failed to start', err);
    process.exit(1);
  }
}

function main() {
  const PORT = Number.parseInt(readConfig('SERVER_PORT')) ?? 8888;
  const app = express();
  setMiddlewares(app);
  checkDBConnection().then(() => {
    startServer(app, PORT);
  });
}

main();
