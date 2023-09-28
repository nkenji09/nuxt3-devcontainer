# 環境構築

## 必須アプリケーション

- Visual Studio Code
- Dev Containers（VS Code拡張機能）

## 環境の立ち上げ

1. VS Code 画面左下の「><」をクリック
2. 「Reopen in Container」をクリック（しばらく待つ）
   - 型を認識しないときは「Reopen Folder Localy」を押した後、「Reopen in Container」をやり直してみる
3. VS Code 内のターミナルで下記の操作を実行
   - 開発環境立ち上げ ... `npm run dev`
   - Vitestの実行 ... `npm run test`
   - その他は package.json の scripts を参照

## ログレベルの変更

1. 各環境（development, staging, production）の .env を作成
   - .env.development等
2. クライアントサイドのログレベル
   - NUXT_PUBLIC_LOGGER_LEVEL
3. サーバーサイドのログレベル
   - NUXT_SERVER_LOGGER_LEVEL

※ ログレベルの種類（debug, info, warn, error, none）

## 主なGitの運用

1. 作業ブランチを作成
   - 例： `git checkout -b feat-XXXXX`
2. commitを作成（NPMスクリプトを利用すること）
   - `npm run commit`
3. 作業ブランチをPush
   - 例： `git push origin HEAD`
4. PRを作成
5. approveされたら mainブランチにマージ

---

# node_modules

※ 依存モジュールの用途を常に明確にしておく

## dependencies

### Store

- pinia
- @pinia/nuxt
- @pinia-plugin-persistedstate/nuxt

※ overrides: { vue: latest } を追加

### APIの型安全呼び出し

- aspida
- @aspida/fetch

### Result型

- neverthrow

## devDependencies

### TypeScript

- typescript

### Nuxt

- @nuxt/devtools
- nuxt

### ESLint

- @nuxtjs/eslint-config-typescript
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint
- eslint-plugin-vue

### ESLint - import順を自動整形

- eslint-plugin-import

### StyleLint

- stylelint
- stylelint-config-recommended
- stylelint-config-recommended-vue
- stylelint-config-standard
- stylelint-config-recommended-scss
- postcss-html

### StyleLint - CSS順を自動整形

- stylelint-config-recess-order

### Prettier

- @vue/eslint-config-prettier
- eslint-plugin-prettier
- prettier

### Git Commit

- commitizen
- cz-conventional-changelog
- husky
- lint-staged

### Unit Test

- nuxt-vitest
- happy-dom
- vitest

### NPM Script Utils

- npm-run-all
