// 1. シンプルなHTTPサーバ
// ※ Node.js標準のHTTPサーバであり、Expressではない
// 実行方法: node --loader ts-node/esm index.ts

// import * as http from 'http';

// const server = http.createServer((req, res) => {
//   res.writeHead(200, {
//     'Content-Type': 'text/plain; charset=utf-8'
//   });
//   res.end('Hello, this is Web Server');
// });

// const PORT = 8888;

// server.listen(PORT, () => {
//   console.log('Server is listening');
// });

// 2. Expressサーバ版
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { AppDataSource } from "./datasource.js";
import { User } from "./userEntity.js";
import { pool } from "./datapool.js";

const app = express();
app.use(express.json()); // RequestBodyにJSONが使えるようになる
app.use(express.static('public')); // public配下の静的ファイルを公開する
const PORT = 8888;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
  // ヘッダの設定は不要 返すコンテンツに合わせて自動的に設定される
  res.send('Hello, this is Express server');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// URLパラメータ: 必須の情報を渡すのに使う
app.get('/echoWithURLParam/:id', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Hello ${req.params.id}</h1>
      </body>
    </html>
  `);
});


// クエリパラメータ: 必須ではない、任意の情報を渡すのに使う
app.get('/echoWithQueryParam', (req, res) => {
  const name = req.query.name;
  res.send(`
    <html>
      <body>
        <h1>Hello ${name}</h1>
      </body>
    </html>  
  `);
});

app.post('/', (req, res) => {
  const name = req.body.name;
  res.send(`Hello ${name}`);
});

app.put('/:name', (req, res) => {
  res.send(req.params.name);
});

app.delete('/:name', (req, res) => {
  res.send(req.params.name);
});

app.listen(PORT, () => {
  console.log('Server is listening');
});

// フォームの表示とSubmit
app.get('/form', (_, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.post('/form', (req, res) => {
  res.json({
    name: req.body.name,
    age: req.body.age,
  });
});

// DB
// AppDataSource.initialize()
//   .then(() => {
//     console.log('データベースに接続しました');
//   })
//   .catch(error => {
//     console.error(error);
//   });

// INSERT
// ORM版
// app.post('/users', async (req, res) => {
//   const { name, email } = req.body;
//   const user = new User();
//   user.name = name;
//   user.email = email;

//   // typeormによって、repository(DAO)が自動作成されている
//   const userRepository = AppDataSource.getRepository(User);
//   const newUser = await userRepository.save(user);
//   res.json(newUser);
// });

//SQL版
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const result = await pool.query (
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );

  res.json(result.rows[0]);
});

// SELECT
// ORM版
// app.get('/users', async (_, res) => {
//   const userRepository = AppDataSource.getRepository(User);
//   const users: User[] = await userRepository.find();
//   res.json(users);
// });
// app.get('/users/:id', async (req, res) => {
//   const id: number = Number.parseInt(req.params.id);
//   const userRepository = AppDataSource.getRepository(User);
//   const user: User | null = await userRepository.findOneBy({ id });
//   res.json(user);
// });

// SQL版
app.get('/users', async (_, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});
app.get('/users/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const result = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  res.json(result.rows[0] ?? null);
});

// UPDATE
// ORM版
// app.put('/users/:id', async (req, res) => {
//   const id: number = Number.parseInt(req.params.id);
//   const { name, email } = req.body;
//   const userRepository = AppDataSource.getRepository(User);
//   const user: User | null = await userRepository.findOneBy({ id });
//   if (user) {
//     user.name = name;
//     user.email = email;
//     const updatedUser = await userRepository.save(user);
//     res.json(updatedUser);
//   } else {
//     throw Error(`user ${id} does not exist`);
//   }
// });

// SQL版
app.put('/usesr/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const { name, email } = req.body;
  const result = await pool.query(
    `
      UPDATE users
      SET name = $1, email = $2
      WHERE id = $3
      RETURNING *
    `, [name, email, id]
  );
  if (result.rows.length === 0) {
    throw new Error(`user ${id} does note exist`);
  }

  res.json(result.rows[0]);
});

// DELETE
// ORM版
// app.delete('/users/:id', async (req, res) => {
//   const id: number = Number.parseInt(req.params.id);
//   const userRepository = AppDataSource.getRepository(User);
//   await userRepository.delete({ id });
// });

// SQL版
app.delete('/users/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id);
  await pool.query('DELETE FORM users WHERE id = $1', [id]);
  res.json({ success: true });
});

/*
  ORMでサブクエリも記述可能
  例. ユーザごとの投稿数を取得する
  const users = await dataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .addSelect((subQuery) => {
      return subQuery
        .select('COUNT(post.id)", 'postCount')
        .from(Post, 'Post')
        .where('post.userId = user.id');
    }, 'postCount')
    .getRawMany();
*/