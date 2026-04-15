import { AppError } from "../errors/AppError.js";
import type { CardDto } from "../types/dto.js";
import type { CardEntity } from "../types/entity.js";
import { pool } from "../utils/connectionPool.js";

/**
 * カード登録
 * @param { title: string, listId: string } カードタイトル, リストID
 * @returns { Promise<cardEntity | undefined> } 登録したカード
 */
export async function create(
  { title, listId }: { title: string, listId: string}): Promise<CardEntity | undefined> {
  const query =
  `
    INSERT INTO cards (title, description, dueDate, listId)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const result = await pool.query<CardEntity>(query, [title, '', null, listId]);
  return result.rows[0];
}

/**
 * カード全取得
 * @returns { Promise<cardEntity[]> }　カード一覧
 */
export async function findAll(): Promise<CardEntity[]> {
  const query = `SELECT * FROM cards`;
  const result = await pool.query<CardEntity>(query);
  return result.rows;
}

/**
 * カード削除
 * @param { id: string } カードのID
 * @returns { Promise<cardEntity | undefined> } 削除したカード
 */
export async function remove(id: string): Promise<CardEntity | undefined> {
  const query = `DELETE FROM cards WHERE id = $1`;
  const result = await pool.query<CardEntity>(query, [id]);
  return result.rows[0];
}

/**
 * カード更新
 * @param { CardDto[] } dtos 
 * @returns { Promise<CardEntity[]> }
 */
export async function update(dtos: CardDto[]): Promise<CardEntity[]> {
  const query = ``; // WIP: implement SQL
  const result = await pool.query(query);
  return result.rows;
}