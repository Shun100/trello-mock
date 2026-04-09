import type { QueryResult } from "pg";
import { pool } from "../utils/connectionPool.js"

/**
 * リスト新規登録
 * @param { string } title 
 * @param { number | undefined } position
 * @returns { Promise<QueryResult> } 
 */
// export const save = async (title: string, position?: number): Promise<QueryResult> => {
//   let result: QueryResult;

//   if (position) {
//     result = await pool.query(`
//       INSERT INTO　lists (title, position)
//       VALUES　($1, $2)
//       RETURNING　*
//       `,
//       [title, position]
//     );
//   } else {
//     result = await pool.query(`
//       INSERT INTO　lists (title)
//       VALUES　($1)
//       RETURNING　*
// 　　　 `,
//       [title]
//     );
//   }

//   return result.rows[0];
// }

export const save = async (title: string, position?: number): Promise<QueryResult> => {
  const columns = ['title'];
  const values: (string | number)[] = [title];
  const placeholders = ['$1'];

  if (position !== undefined) { // position = 0を許容する
    columns.push('position');
    values.push(position);
    placeholders.push(`$${values.length}`);
  }

  const result = await pool.query(
    `
    INSERT INTO lists (${columns.join(', ')})
    VALUES (${placeholders.join(', ')})
    RETURNING *
    `,
    values
  );

  return result.rows[0];
};