import type { Request, Response, NextFunction } from "express";
import * as cardService from "../services/cardService.js";
import { AppError } from "../errors/AppError.js";
import type { CardDto } from "../types/dto.js";

// カード登録
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { title, listId } = req.body;
    const result = await cardService.create({ title, listId });
    if (!result) {
      next(new AppError(500, `カードの登録に失敗しました req.body = ${req.body}`));
    }
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

// カード取得
export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await cardService.findAll();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

// カード削除
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  const id = req.params.id;

  if (!id) {
    return next(new AppError(400, 'IDが指定されていません'));
  }

  if (Array.isArray(id)) {
    return next(new AppError(400, `不正なパラメータ: ${id}`));
  }

  try {
    const result = await cardService.remove(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

// カード更新
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { cards } = req.body;
  if (!cards) {
    return next(new AppError(400, 'カードが指定されていません'));
  }
  const dtos: CardDto[] = Array.isArray(cards) ? cards : [cards];

  try {
    const results = await cardService.update(dtos);
    res.json(200).json(results);
  } catch (err) {
    next(err);
  }
}
