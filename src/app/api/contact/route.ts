import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      subject: `[お問い合わせ] ${name}さんから`,
      text: `
お名前: ${name}
メールアドレス: ${email}
お問い合わせ内容:
${message}
      `,
    };

    const userMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: `【MyTechCompany】お問い合わせありがとうございます`,
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
`,
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
