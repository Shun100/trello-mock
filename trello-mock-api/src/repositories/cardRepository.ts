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
export async function update(entities: CardDto[]): Promise<CardEntity[]> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const values: any[] = [];
    const placeholders: string[] = [];

    // TODO: 処理共通化
    entities.forEach((card, index) => {
      const i = index * 7;
      placeholders.push(`($${ i + 1 }, $${ i + 2}, $${ i + 3 }, $${ i + 4 }, $${ i + 5 }, $${ i + 6 }, $${ i + 7}`);
      values.push(card.id, card.description, card.title, card.position, card.completed, card.dueDate, card.list_id);
    });

    const query = 
      `
      UPDATE cards
      SET
        title = data.title,
        description = data.description,
        position = data.position,
        completed = data.completed,
        dueDate = data.dueDate
        list_id = data.list_id,
        updated_at = CURRENT_TIMESTAMP(0)
      FROM
        (VALUES ${placeholders.join(', ')}) AS data(id, title, description, position, completed, dueDate, list_id)
      WHERE
        cards.id = data.id
      RETURNING
        cards.*
      `;

      const result = await client.query<CardEntity>(query, values);
      await client.query('COMMIT');
      return result.rows;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}