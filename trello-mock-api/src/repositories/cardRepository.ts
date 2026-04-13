import { AppError } from "../errors/AppError.js";
import type { cardEntity } from "../types/entity.js";
import { pool } from "../utils/connectionPool.js";

/**
 * カード登録
 * @param { title: string, listId: string } 
 * @returns Promise<cardEntity>
 */
export async function create({ title, listId }: { title: string, listId: string}): Promise<cardEntity> {
  const query =
  `
    INSERT INTO cards (title, description, dueDate, listId)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const result = await pool.query<cardEntity>(query, [title, '', null, listId]);
  if (!result.rows[0]) {
    throw new AppError(500, '登録に失敗しました');
  }
  return result.rows[0];
}