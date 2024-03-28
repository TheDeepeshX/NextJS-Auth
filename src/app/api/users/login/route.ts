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
        console.log(reqBody);
        await User.findOne({email})
        if(!User){
          return NextResponse.json({error:"User Dose not exist"},{status:400})
        }
       console.log("User Exist");
       const validPassword = bcryptjs.compare(password,User.password)        
       if(!validPassword)
       { return NextResponse.json({error:"check Your credential"},{status:400})
       } 
       const tokenData={
        id:User._id,
        username:User.username,
        email:User.email
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