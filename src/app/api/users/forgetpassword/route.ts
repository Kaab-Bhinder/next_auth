import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    await sendEmail({ email, emailType: "RESET", userID: user._id });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
