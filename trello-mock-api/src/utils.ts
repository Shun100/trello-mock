import dotenv from 'dotenv';

dotenv.config();

/**
 * 設定値取得
 * @param { string } name 設定項目名
 * @returns { string } 設定値
 * @throws 設定値項目が存在しない
 */
export const readConfig = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error (`${name} is not defined`);
  }
  return value;
}