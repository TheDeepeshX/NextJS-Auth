//Login route
import { connect } from "@/DBconfig/DBconfig";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '@/models/userModule';
import {NextRequest,NextResponse} from 'next/server';
connect()

export async function GET(request:NextRequest) 
{
    try {
        const response = NextResponse.json({message:"Logout Sucessfully!",sucess:true})
        response.cookies.set('token','',{httpOnly:true,expires:new Date(0)})
        return response;
    } catch (error:any) {
    console.log("big errror",error);
    return NextResponse.json({error:error.message},{status:500});  
    }
}