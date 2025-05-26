import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/schema/contact";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = contactSchema.parse(body);
    
    console.log("Contact form submission:", validatedData);
    
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
