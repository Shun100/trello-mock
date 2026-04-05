# TypeScript実行環境のセットアップ方法

1. セットアップ

```cmd
<!-- package.jsonの自動作成 -->
<!-- package.json: Node.jsプロジェクトの初期設定ファイル -->
npm init -y

<!-- typescript:  コンパイラ -->
<!-- ts-node:     TypeScriptをNode.js環境で動かせるようにする -->
<!-- @types/node: Node.jsのTypeScript用の型定義ファイル -->
npm install typescript ts-node @types/node -D

<!-- コンパイラの設定ファイル -->
npx tsc --init
```

2. 動作確認

- `index.ts`というファイルを新規作成して、以下のように記述

```TypeScript
  console.log('Hello World');
```

- `index.ts`を実行する

```cmd
  npx ts-node index.ts
```

3. 追加でインストールするライブラリ

- `npm install`で以下のライブラリをインストールする

| ライブラリ       | 用途                      |
| ---------------- | ------------------------- |
| `nodemon`        | ホットリロード            |
| `express`        | Webサーバ用フレームワーク |
| `@types/express` | express用の型定義         |
| `sqlite3@^5.1.7` | sqlite                    |
| `pg`             | PostgreSQL                |
| `@types/pg`      | PostgreSQL用の型定義      |
| `typeorm`        | ORM                       |

4. 注意点

- CommonJSかESMかによって使えるライブラリが結構違うので、実際にプロジェクトを立てるときは調べながら進めること
