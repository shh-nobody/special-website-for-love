import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json(
      { success: false, error: "Message required" },
      { status: 400 }
    );
  }

  try {
    // Transporter Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "silentkiller.019283@gmail.com", // sender
        pass: process.env.GMAIL_APP_PASSWORD, // pakai APP PASSWORD, bukan password asli
      },
    });

    await transporter.sendMail({
      from: "silentkiller.019283@gmail.com",
      to: "reyhan.firdaus227@gmail.com",
      subject: "A Special Note ❤️",
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
