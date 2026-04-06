# trello-mock

Trello mock backend with TypeScript + Express

## 1. 環境構築

- WindowsPowershellで以下のコマンドを実行

```PowerShell
  npm init -y
  npm install express
  npm install ts-node ts-node-dev typescript @types/node @types/express -D
  npx tsc --init
```

- `package.json`を編集
  - `type`を`CommonJS`から`module`に変更
  - `script`に`dev`を追加

  ```json

    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "tsx watch index.ts"
    },
  ```

- `tsconfig.json`を変更
  - `types`を`[]`から`["node"]`に変更

## 2. ライブラリについて

| ライブラリ       | 用途                                                               |
| ---------------- | ------------------------------------------------------------------ |
| `express`        | Webサーバ                                                          |
| `tsx`            | TypeScriptをそのまま実行できて、しかも高速&ESM完全対応の実行ツール |
| `@types/node`    | Node.js用の型定義                                                  |
| `@types/express` | Express用の型定義                                                  |

## 開発環境の配布方法

- `package.json`と`package.json`が入っているプロジェクトフォルダを渡す
  - 受け取った人は`npm ci`と実行すれば、ライブラリが同じバージョンでインストールされる
  - `npm install`が「なるべく近いバージョン」をインストールするのに対して、`npm ci`は「厳密に同じバージョン」をインストールする
