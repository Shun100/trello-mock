import "express";

// ExpressのRequestオブジェクトにrequestTimeフィールドを追加
declare global {
  namespace Express {
    interface Request {
      requestTime?: number;
    }
  }
}