import type { NextFunction, Request, Response } from "express";
import type { ListDto } from "../dtos/listDto.js";
import * as listService from "../services/listService.js";
import { AppError } from "../errors/AppError.js";
import type { ListEntity } from "../types/entity.js";

// リスト登録
export async function create(req: Request, res: Response, next: NextFunction) {
  const { title } = req.body;
  try {
    const result = await listService.create(title);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

// リスト全取得
export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await listService.findAll();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

// リスト削除
export async function remove(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  if (!id) {
    throw new AppError(400, 'リストが指定されていません');
  }

  if (Array.isArray(id)) {
    throw new AppError(400, `不正なパラメータ: ${id}`);
  }

  try {
    const result = await listService.remove(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

// リスト更新（複数）
export async function updateMany(req: Request, res: Response, next: NextFunction) {
  try {
    const { lists }: { lists: ListDto[] } = req.body();
    const dtos: ListDto[] = lists.map(list => ({ id: list.id, position: list.position }));
    const results: ListEntity[] = await listService.updateMany(dtos);
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
}