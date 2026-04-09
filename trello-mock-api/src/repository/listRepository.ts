import type { QueryResult } from "pg";
import { pool } from "../utils/connectionPool.js"

/**
 * リスト新規登録
 * @param { string } title 
 * @param { number | undefined } position
 * @returns { Promise<QueryResult> } 
 */
export const save = async (title: string, position?: number): Promise<QueryResult> => {
  let result: QueryResult;

  if (position) {
    result = await pool.query(`
      INSERT INTO
        lists (title, position)
      VALUES
        ($1, $2)
      RETURNING
        *`,
      [title, position]
    );
  } else {
    result = await pool.query(`
      INSERT INTO
        lists (title)
      VALUES
        ($1)
      RETURNING
        *`,
      [title]
    );
  }

  return result.rows[0];
}