//Login route
import { connect } from "@/DBconfig/DBconfig";
import User from '@/models/userModule';
import { GetDataFromToken } from "@/Helpers/getdatafromtoken";
import {NextRequest,NextResponse} from 'next/server';
connect()
//not working properly
export async function GET(request:NextRequest) {
   const Userid = await GetDataFromToken(request);
   const user =await User.findById({_id:Userid}).select("-password");
   
   if(!user)
   {
    return NextResponse.json({message:"User Not Found",data:user})
   }
return NextResponse.json({message:"User Found",data:user})
}