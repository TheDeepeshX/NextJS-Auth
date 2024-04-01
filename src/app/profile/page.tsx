"use client"
import react, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast, { Toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Profile(){
    var router=useRouter();
    const [data,setData]=useState("nothing");
    const getUserdata=async()=>{
       var responce = await axios.get("/api/users/me");
       console.log(responce);
       setData(responce.data.data._id)
    }
    const logout = async ()=>{
    try {
         var logout = await axios.get("/api/users/logout");
         console.log(logout);
         toast.success("log-out")
         router.push("/login")        
        } catch (error:any) {
            console.log(error);
            toast.error(error.message)
        }
    }
return(
    <div className='flex flex-col items-center justify-center py-2 min-h-screen'>
    <h1>Profile Page</h1>
    <hr />
    <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
    <hr />
    <button onClick={getUserdata} className='bg-blue-500 text-white py-2 px-3 rounded hover:bg-green-600 m-5'  >Get User Data</button>    
    <button onClick={logout} className='bg-blue-500 text-white py-2 px-3 rounded hover:bg-red-600 '  >Logout</button>    
</div>
)
}
export default Profile;