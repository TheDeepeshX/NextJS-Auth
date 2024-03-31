"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';

function verifyemail(){
    // var Router=useRouter()
    const[token,setToken]= useState("")
    const[verifyed,setVerifyed]= useState(false)
    const[error,setError]=useState(false)
    useEffect(()=>{
       var URLtoken = window.location.search.split('=')[1]
       setToken(URLtoken || "")
       // const {query}=Router
       // const URLtoken2 = query.token
     },[])
     useEffect(()=>{
        if (token.length>0) {
            verifyemail()
        }
      },[token])
    const verifyemail=async()=>{
      try {
       var response = await axios.post("/api/users/verifyemail",{token})
       setVerifyed(true)
       toast.success("Verifyed Sucessfully");
      } catch (error:any) {
       console.log("error in frontend",error);
       setError(true)
      }
    }
    
    return(
  <div className="flex flex-col items-center justify-center min-h-screen py-2" >  
    <h1 className='text-4xl'>Verify E-mail</h1>
    <h2 className='p-2 bg-green-500 text-black'>{token?`${token}`:"token no found"}</h2>
    {verifyed && (
        <div>
            <h2 className='text-4xl '>Verified</h2>
            <Link href={"/login"}>GoTo Login</Link>
        </div>
    )}
    {error && (
        <div>
            <h2 className='text-4xl '>Error</h2>
        </div>
    )}
  </div>
)
}
export default verifyemail;