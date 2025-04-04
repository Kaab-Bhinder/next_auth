import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
export const sendEmail = async ({email,emailType,userID}:any) => {
  try{
    const hashedToken=await bcrypt.hash(userID.toString(),10);
    if(emailType==='VERIFY'){
    await User.findByIdAndUpdate(userID,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000});
    }
    else if(emailType==='RESET'){
      await User.findByIdAndUpdate(userID,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000});
    } 
   // Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5b5e42494dca26",
    pass: "14a5d5b00cc886"
  }
});
const mailOptions={
  from:"kaabbhinder28@gmail.com",
  to:email,
  subject:emailType==="VERIFY"?"Verify Your Email":"Reset Your Password",
  html:`<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY" ? "Verify your email":"Reset your password"} 
  or copy paste the link in your browser
  <br> ${process.env.domain}/verifyemail?token=${hashedToken}
  </p>`

}
const mailresponse=await transport.sendMail(mailOptions);
return mailresponse;
  } catch(error:any){
    throw new Error(error.message);
  }
}