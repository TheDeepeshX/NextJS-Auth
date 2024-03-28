//Login route
import { connect } from "@/DBconfig/DBconfig";
import User from '@/models/userModule';
import { GetDataFromToken } from "@/Helpers/getdatafromtoken";
import {NextRequest,NextResponse} from 'next/server';
connect()
//not working properly
export async function POST(request:NextRequest) {
//extrat data from token
   const Userid = await GetDataFromToken(request);
   console.log("get data fom token",Userid);   
   const user = User.findOne({_id:Userid}).select("-password")
   console.log("serch in DB ",user);
   
   if(!user)
   {
    return NextResponse.json({message:"User Not Found",data:user})
   }
return NextResponse.json({message:"User Found",data:user})
}