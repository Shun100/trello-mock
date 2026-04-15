import * as cardRepository from "../repositories/cardRepository.js";
import type { CardDto } from "../types/dto.js";
import type { CardEntity } from "../types/entity.js";

// カード登録
export async function create(
  { title, listId }: { title: string, listId: string }): Promise<CardEntity | undefined> {
  const result = await cardRepository.create({ title, listId });
  return result;
}

// カード取得
export async function findAll(): Promise<CardEntity[]> {
  const result = await cardRepository.findAll();
  return result;
}

// カード削除
export async function remove(id: string): Promise<CardEntity | undefined> {
  const result = await cardRepository.remove(id);
  return result;
}

// カード更新
export async function update(dtos: CardDto[]): Promise<CardEntity[]> {
  const results = await cardRepository.update(dtos);
  return results;
}