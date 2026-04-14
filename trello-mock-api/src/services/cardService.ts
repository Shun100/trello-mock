import * as cardRepository from "../repositories/cardRepository.js";
import type { cardEntity } from "../types/entity.js";

// カード登録
export async function create(
  { title, listId }: { title: string, listId: string }): Promise<cardEntity | undefined> {
  const result = await cardRepository.create({ title, listId });
  return result;
}

// カード取得
export async function findAll(): Promise<cardEntity[]> {
  const result = await cardRepository.findAll();
  return result;
}

// カード削除
export async function remove(id: string): Promise<cardEntity | undefined> {
  const result = await cardRepository.remove(id);
  return result;
}