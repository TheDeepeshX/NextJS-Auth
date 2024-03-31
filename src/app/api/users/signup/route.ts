import { connect } from "@/DBconfig/DBconfig";
import User from '@/models/userModule';
import bcryptjs from 'bcryptjs';
import {NextRequest,NextResponse} from 'next/server';
import { sendEmail } from "@/Helpers/mailer";

connect()

export async function POST(request:NextRequest){
        try {
        const reqBody = await request.json()
        const { username,email,password} = reqBody
        //Validation 
        console.log(reqBody);
        //check if user already exist
        const user = await User.findOne({email})
        if (user) {
        return NextResponse.json({error:'user already exist'},{status:400});          
        }
        const salt= await bcryptjs.genSalt(10)
        const hashsdPassword = await bcryptjs.hash(password,salt)        
        const newUser = new User({
            username,
            email,
            password:hashsdPassword,

        })
        const savedUser = await newUser.save()
        console.log("checking save user data",savedUser);
        //Send Verification mail
        await sendEmail({email,emailtype:'VERIFY',userID:savedUser._id})
        return NextResponse.json({
            message:'User Registered Sucessfully...',
            sucess:true,
            savedUser
        })
  } 
    catch (error:any)
    {    console.log("main catch run",error);
        return NextResponse.json({error:error.message},{status:500})
    }
    
}