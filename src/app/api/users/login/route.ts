//Login route
import { connect } from "@/DBconfig/DBconfig";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '@/models/userModule';
import {NextRequest,NextResponse} from 'next/server';
connect()
//ok tested
export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const { username,email,password} = reqBody
        //Validation 
        var  user =  await User.findOne({email})
        if(!user){
          return NextResponse.json({error:"User Dose not exist"},{status:400})
        }
      const validPassword = bcryptjs.compare(password,user.password)        
       if(!validPassword)
       { return NextResponse.json({error:"check Your credential"},{status:400})
       } 
       const tokenData={
        id:user._id,
        username:user.username,
        email:user.email
       }
       const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1h'})
       const response=NextResponse.json({Message:"Logged IN Sucessfully",suess:true})
       response.cookies.set("token",token,{httpOnly:true})
       return response
    }catch (error:any) {
    console.log("big errror",error);
    return NextResponse.json({error:error.message},{status:500});      
    }
}