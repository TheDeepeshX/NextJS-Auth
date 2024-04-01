import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";

export const GetDataFromToken=(request:NextRequest)=>{
try {
   const token = request.cookies.get("token")?.value ||"";
   const DecodeToken:any = Jwt.verify(token,process.env.TOKEN_SECRET!);
   return DecodeToken.id
  } catch (error:any) {
    console.log("big error are hit");
    return NextResponse.json({error:error.message},{status:500})
  }
}