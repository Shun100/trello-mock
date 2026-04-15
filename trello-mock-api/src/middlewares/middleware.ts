import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

// リクエストに日時を付与する
export function requestTime(req: Request, res: Response, next: NextFunction) {
  req.requestTime = Date.now();
  next();
}

// 404エラー
export function requestError(req: Request, res: Response, next: NextFunction) {
  const error = new AppError(404, `ルートが見つかりません: ${req.originalUrl}`);
  next(error);
}

/**
 * 500エラー
 * next(error)が呼び出されると、他のミドルウェアはスキップされた直接ここにジャンプする
 */
export function serverError(err: unknown, req: Request, res: Response, next: NextFunction) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof Error ? err.message : 'エラーが発生しました';

  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path} - Error: ${message}`);

  res.status(statusCode).json(message);
}