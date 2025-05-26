import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "お名前は必須です。" })
    .max(50, { message: "お名前は50文字以内で入力してください。" }),
  email: z
    .string()
    .trim()
    .email({ message: "有効なメールアドレスを入力してください。" })
    .max(254, { message: "メールアドレスは254文字以内で入力してください。" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "お問い合わせ内容は10文字以上で入力してください。" })
    .max(1000, { message: "お問い合わせ内容は1000文字以内で入力してください。" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
