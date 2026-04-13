import type { ListDto } from "../types/dto.js";
import { AppError } from "../errors/AppError.js";
import * as listRepository from "../repositories/listRepository.js";
import type { ListEntity } from "../types/entity.js";

/**
 * リスト登録
 * @param { string } title 
 * @returns { Promise<ListEntity> }
 */
export async function create(title: string): Promise<ListEntity> {
  const result = await listRepository.create(title);
  if (!result) {
    throw new AppError(500, '登録に失敗しました');
  }
  return result;
}

/**
 * リスト全取得
 * @returns { Promise<ListEntity[]> }
 */
export async function findAll(): Promise<ListEntity[]> {
  const results = await listRepository.findAll();
  return results;
}

/**
 * リスト削除
 * @param { string } id
 * @returns { Promise<ListEntity> }
 */
export async function remove(id: string): Promise<ListEntity> {
  const result = await listRepository.remove(id);
  if (!result) {
    throw new AppError(500, '削除に失敗しました');
  }
  return result;
}

/**
 * リスト更新（複数）
 * @param { ListDto[] } lists
 * @returns { ListEntity[] }
 */
export async function updateMany(lists: ListDto[]): Promise<ListEntity[]> {
  const results = await listRepository.updateMany(lists);
  return results;
}
