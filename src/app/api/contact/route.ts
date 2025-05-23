import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * お問い合わせフォームからのPOSTリクエストを処理するAPIエンドポイント
 * フォームデータを受け取り、管理者と送信者の両方にメールを送信する
 */
export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '必須フィールドが不足しています' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,         // SMTPサーバーのホスト名
      port: Number(process.env.SMTP_PORT) || 587, // ポート番号（デフォルト587）
      secure: process.env.SMTP_SECURE === 'true', // SSL/TLS設定
      auth: {
        user: process.env.SMTP_USER,       // SMTP認証ユーザー
        pass: process.env.SMTP_PASS,       // SMTP認証パスワード
      },
    });

    const adminMailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.SMTP_USER}>`, // 送信元（表示名 + メールアドレス）
      to: process.env.MAIL_TO_ADMIN,       // 管理者のメールアドレス
      subject: `[お問い合わせ] ${name}さんから`, // 件名
      text: `
お名前: ${name}
メールアドレス: ${email}
お問い合わせ内容:
${message}
      `, // 本文（プレーンテキスト形式）
    };

    const userMailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.SMTP_USER}>`, // 送信元（表示名 + メールアドレス）
      to: email,                           // 送信者のメールアドレス
      subject: process.env.MAIL_REPLY_SUBJECT, // 件名（環境変数から取得）
      text: `
${name}様

この度はお問い合わせいただき、誠にありがとうございます。
以下の内容で受け付けいたしました：

-------------------------------------
お名前: ${name}
メール: ${email}
お問い合わせ内容:
${message}
-------------------------------------

近日中にご連絡いたしますので、しばらくお待ちください。

※このメールは自動送信されています。返信はご遠慮ください。
`, // 本文（プレーンテキスト形式）
    };

    try {
      await transporter.sendMail(adminMailOptions);
      
      await transporter.sendMail(userMailOptions);
      
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error('メール送信エラー:', error);
      return NextResponse.json(
        { error: 'メール送信に失敗しました' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('リクエスト処理エラー:', error);
    return NextResponse.json(
      { error: 'リクエスト処理に失敗しました' },
      { status: 500 }
    );
  }
}
