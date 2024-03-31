import { connect } from "@/DBconfig/DBconfig";
import User from '@/models/userModule';
import bcryptjs from 'bcryptjs';
import {NextRequest,NextResponse} from 'next/server';
import { sendEmail } from "@/Helpers/mailer";
// Verifi email mail send
connect()
//ok tested
export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {token} =reqBody;
        console.log(token);
        const user = await User.findOne({verifyToken:token, verifyTokenExpiry:{$gt:Date.now()}})
        console.log(user);        
        if(!user)
        {console.log("User Token Invalid!");
        return NextResponse.json({error:"User Token Invalid!"},{status:500}); 
        }
        console.log(user);
        
        user.isVerified=true
        user. verifyToken=undefined
        user.verifyTokenExpiry=undefined
        await user.save()
        return NextResponse.json({message:"Email Verifyed Sucessfully",sucess:true},{status:200})
        console.log("Userdata true verify!");
    } catch (error:any)
    {  console.log("big errror",error);
      return NextResponse.json({error:error.message},{status:500});        
    }
}