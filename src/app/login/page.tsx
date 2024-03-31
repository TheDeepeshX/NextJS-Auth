"use client"
import React,{ useState,useEffect } from "react";
import axios from "axios";
import toast, { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function loginPage(){
const route = useRouter();
const [user,setUser]=useState({
        email:"",
        password:""
    });
const [buttonDisabled,setButtondisabled]=useState(false);
const [loading,setLoading]=useState(false);

const onLogin=async()=>{
  try {
    setLoading(true)
    var response = await axios.post("/api/users/login",user);
    console.log("login Sucess",response);
    toast.success('Successfully created!')
  } 
  catch (error:any) {
    console.log("signeup failed");
    toast.error(error.message)
  }
  }
  useEffect(()=>{
if(user.email.length > 0 && user.password.length > 0 )
  {console.log("all Field are sucess fullly filled")
  }else{ setButtondisabled(true)}},[user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading?"processing":"Login"}</h1>
            <hr />
            <label htmlFor="UserName">Email</label>
            <input type="text" placeholder="E-mail" 
            className='p-2 border border-gray-300 rounded-lg
            mb-4 focus:outline-none focus:border-gray-600
            text-black'onChange={(e)=>setUser({...user,email:e.target.value})}  value={user.email} id="email" />
            <label htmlFor="UserName">Password</label>
            <input type="text" placeholder="Password" 
            className='p-2 border border-gray-300 rounded-lg
            mb-4 focus:outline-none focus:border-gray-600
            text-black'onChange={(e)=>setUser({...user,password:e.target.value})}  value={user.password} id="password" />
            <button
            onClick={onLogin}
            className='p-2 border border-gray-300
            rounded-lg mb-4 focus:outline-none
            focus:border-gray-600'
            >{buttonDisabled?"Fill the form":"Login"}</button>
            <Link href="/signup">Visit Signup Page</Link>
        </div>
    )
}
export default loginPage;