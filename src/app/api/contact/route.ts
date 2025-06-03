import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/schema/contact";
import { ZodError } from "zod";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = contactSchema.parse(body);
    
    console.log("Contact form submission:", validatedData);
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: parseInt(process.env.SMTP_PORT || "587") === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_FROM, // Send to yourself
      subject: `お問い合わせ: ${validatedData.name}様より`,
      html: `
        <h2>新しいお問い合わせ</h2>
        <p><strong>お名前:</strong> ${validatedData.name}</p>
        <p><strong>メールアドレス:</strong> ${validatedData.email}</p>
        <p><strong>お問い合わせ内容:</strong></p>
        <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
      `,
    });
    
    return NextResponse.json(
      { message: "お問い合わせを受け付けました。" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          message: "入力内容に誤りがあります。",
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    console.error("Contact API error:", error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
