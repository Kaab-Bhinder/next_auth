import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
connect();
export async function POST(request:NextRequest){
  try{
    const reqBody=await request.json();
    const {token}=reqBody
    console.log(token);
    const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}});
    if(!user){
      return NextResponse.json({
        message:"Token is invalid or expired",
        success:false
      },{status:400});
    }
    console.log(user);
    user.isVerified=true;
    user.verifyToken=undefined;
    user.verifyTokenExpire=undefined;
    await user.save();
    return NextResponse.json({
      message:"Email verified successfully",
      success:true
    });
  }

  catch(error:any){
    return NextResponse.json({error:error.message},{status:500});
  } 
}