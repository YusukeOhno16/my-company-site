# 環境変数設定

このドキュメントでは、システムで使用される環境変数の設定について説明します。

## 1. 環境変数の概要

### 1.1 環境変数の目的
- 機密情報の保護
- 環境ごとの設定の分離
- デプロイメントの柔軟性確保

### 1.2 主要な環境変数
| 環境変数 | 説明 | 例 |
|---------|------|-----|
| SMTP_HOST | SMTPサーバーのホスト名 | smtp.example.com |
| SMTP_PORT | SMTPサーバーのポート番号 | 587 |
| SMTP_USER | SMTPユーザー名 | user@example.com |
| SMTP_PASSWORD | SMTPパスワード | password123 |
| MAIL_FROM | 送信元メールアドレス | noreply@example.com |

## 2. 環境変数の管理方法

### 2.1 ローカル開発環境
ローカル開発環境では、`.env.local`ファイルを使用して環境変数を管理します。

```
# .env.local
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASSWORD=password123
MAIL_FROM=noreply@example.com
```

`.env.local`ファイルは`.gitignore`に追加し、リポジトリにコミットされないようにします。

### 2.2 CI/CD環境
CI/CD環境では、GitHub Secretsを使用して環境変数を管理します。

1. GitHubリポジトリの「Settings」→「Secrets and variables」→「Actions」にアクセス
2. 「New repository secret」ボタンをクリック
3. 必要な環境変数を追加

### 2.3 本番環境
本番環境（Vercel）では、Vercel管理画面から環境変数を設定します。

1. Vercelダッシュボードの「Settings」→「Environment Variables」にアクセス
2. 必要な環境変数を追加

## 3. 環境変数の使用方法

### 3.1 サーバーサイドでの使用
Next.jsのサーバーサイドコード（API Routes、Server Components）では、`process.env`を通じて環境変数にアクセスできます。

```typescript
// src/app/api/contact/route.ts
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
```

### 3.2 クライアントサイドでの使用
クライアントサイドで環境変数を使用する場合は、`NEXT_PUBLIC_`プレフィックスを付ける必要があります。

```typescript
// クライアントサイドでの使用例
console.log(process.env.NEXT_PUBLIC_API_URL);
```

## 4. セキュリティ対策

### 4.1 機密情報の保護
- パスワードやAPIキーなどの機密情報は、必ず環境変数として管理します。
- ソースコードに直接記述しないようにします。

### 4.2 環境変数の暗号化
- GitHub Secretsは自動的に暗号化されます。
- Vercel環境変数も自動的に暗号化されます。

### 4.3 アクセス制限
- 環境変数へのアクセス権限を制限します。
- 必要な開発者のみがアクセスできるようにします。

## 5. トラブルシューティング

### 5.1 環境変数が読み込まれない
- `.env.local`ファイルがプロジェクトのルートディレクトリに配置されているか確認します。
- 開発サーバーを再起動します。

### 5.2 本番環境での問題
- Vercel管理画面で環境変数が正しく設定されているか確認します。
- デプロイメントログを確認します。

## 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|------|------------|--------|------|
| 2025-05-29 | 0.1 | Devin | 初期ドキュメント作成 |
