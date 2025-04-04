import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse , NextRequest} from "next/server";

connect()
export async function POST(req: NextRequest) {
  try{
    const reqBody = await req.json()
    const {email,password} = reqBody
    const user=await User.findOne({email})
    if(!user){
      return NextResponse.json({error:"User not found",success:false}, {status:400})
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password)
    if(!isPasswordCorrect){
      return NextResponse.json({error:"Invalid credentials",success:false}, {status:400})
    }
    const tokenData={
      id:user._id,
      email:user.email,
      username:user.username
    }
    const token= await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"1h"})
   const response= NextResponse.json({message:"Login successful",success:true})
   response.cookies.set("token", token, {
    httpOnly:true,
    })
    return response
  }
  catch(err:any){
    return NextResponse.json({error:err.message}, {status:500})
  }
}