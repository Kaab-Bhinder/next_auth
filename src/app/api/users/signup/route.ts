import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse , NextRequest} from "next/server";

connect()
export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();
  const salt= await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  // Check if the user already exists 
  const user=await User.findOne({email})
  if(user){
    return NextResponse.json({error:"User already exists"}, {status:400})
  }
  

  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
  const savedUser = await newUser.save();
  console.log(savedUser);
  return NextResponse.json({ message: "User created successfully",success:true,savedUser } ,{ status: 201 });
  } catch (error:any) {
    return NextResponse.json({ error: error.message}, { status: 500 });
  }
}