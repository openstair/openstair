import { NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_EMAIL = "noreply@openstair.in";
const TO_EMAIL = "openstair.technologies@gmail.com";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const attachment = formData.get("attachment");

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All required fields are missing." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const attachments: Array<{ filename: string; content: string; type: string }> = [];

    if (attachment instanceof File && attachment.size > 0) {
      if (attachment.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Attachment must be 5MB or smaller." }, { status: 400 });
      }

      const buffer = Buffer.from(await attachment.arrayBuffer());

      attachments.push({
        filename: attachment.name || "attachment",
        content: buffer.toString("base64"),
        type: attachment.type || "application/octet-stream",
      });
    }

    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New contact message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        attachments,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to send email right now." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
