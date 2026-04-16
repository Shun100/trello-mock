import { pool } from "../utils/connectionPool.js"
import type { ListEntity } from "../types/entity.js";

/**
 * リスト登録
 * @param { string } title 
 * @param { number | undefined } position
 * @returns { Promise<listEntity> } 
 */
export async function create (title: string, position?: number): Promise<ListEntity | undefined> {
  const columns = ['title'];
  const values: (string | number)[] = [title];
  const placeholders = ['$1'];

  if (position !== undefined) { // position = 0を許容する
    columns.push('position');
    values.push(position);
    placeholders.push(`$${values.length}`);
  }

  const result = await pool.query<ListEntity>(
    `
    INSERT INTO lists (${columns.join(', ')})
    VALUES (${placeholders.join(', ')})
    RETURNING *
    `,
    values
  );

  return result.rows[0];
};

/**
 * リスト全取得
 * @returns { Promise<QueryResult[]> } リスト一覧
 */
export async function findAll(): Promise<ListEntity[]> {
  const result = await pool.query<ListEntity>('SELECT * FROM lists');
  return result.rows;
};

/**
 * リスト削除
 * @param { string } id
 * @returns { Promise<ListEntity | undefined> }
 */
export async function remove(id: string): Promise<ListEntity | undefined> {
  const result = await pool.query<ListEntity>(`
    DELETE FROM
      lists
    WHERE
      id = $1
    RETURNING
      *
  `,
  [id]);

  return result.rows[0];
};

/**
 * List更新
 * @param { string } id
 * @param { number } position
 * @returns { Promise<ListEntity | undefined> } - 更新
 */
export async function updateOne (id: string, position: number): Promise<ListEntity | undefined> {
  const result = await pool.query<ListEntity>(`
    UPDATE
      lists
    SET
      position = $1
    WHERE
      id = $2
    RETURNING
      *
  `,
  [position, id]);

  return result.rows[0];
}

/**
 * リスト（複数）削除
 * サブクエリでまとめて1回のクエリ発行で行うためROLLBACK可能
 * @param { { id: string, position: number }[] } lists
 * @returns { Promise<ListEntity[]> }
 * 
 * ・クエリ
 *    UPDATE lists
 *    SET
 *      POSITION = data.position,
 *      updated_at = CURRENT_TIMESTAMP(0)
 *    FROM (
 *      VALUES
 *        ($1, $2),
 *        ($3, $4)
 *    ) AS data(id, position)
 *    WHERE lists.id = data.id
 *    RETURNING list.*;
 */
export async function updateMany(lists: { id: string, position: number }[]): Promise<ListEntity[]> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const values: any[] = [];
    const placeholders : string[] = [];;

    // TODO: 処理共通化
    lists.forEach((list, index) => {
      const i = index * 2;
      placeholders.push(`($${i + 1}, $${i + 2})`);
      values.push(list.id, list.position);
    });

    const query = 
      `
      UPDATE lists
      SET
        position = data.position,
        updated_at = CURRENT_TIMESTAMP(0)
      FROM (VALUES ${placeholders.join(', ')}) AS data(id, position)
      WHERE lists.id = data.id
      RETURNING lists.*
      `;
    
    const result = await client.query<ListEntity>(query, values);
    await client.query('COMMIT');
    return result.rows;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}