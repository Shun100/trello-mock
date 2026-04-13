import type { Request, Response, NextFunction } from "express";

// カード登録
export async function createCard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { title, listId } = req.body;
    const result = await cardServeice.create(title, listId);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}