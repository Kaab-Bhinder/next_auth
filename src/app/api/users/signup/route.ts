import {connect} from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse , NextRequest} from "next/server";
import toast from "react-hot-toast";

connect()
export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();
  const salt= await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  // Check if the user already exists 
  const user=await User.findOne({email})
  if(user){
    return NextResponse.json({error:"User already exists", sucess:"false-user-exists"}, {status:400})
  }
  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
  const savedUser = await newUser.save();
  console.log(savedUser);
  // Send verification email
  await sendEmail({email,emailTYpe:"VERIFY",userID:savedUser._id});  // Send response

  return NextResponse.json({ message: "User created successfully",success:true,savedUser } ,{ status: 200 });
  } catch (error:any) {
    return NextResponse.json({ error: error.message}, { status: 500 });
  }
}