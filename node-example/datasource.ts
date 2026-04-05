import { DataSource } from "typeorm";
import { User } from "./userEntity.js";

// typeormの接続管理

// sqlite用
// export const AppDataSource = new DataSource({
//   type: "sqlite",
//   database: "database.sqlite",
//   synchronize: true,
//   logging: false,
//   entities: [User], // Entityに合わせて自動的にテーブルが作成される
// });

// PostgreSQL用
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User],
});