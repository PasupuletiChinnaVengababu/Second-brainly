import axios from "axios";
import { useState } from "react";

const Signup=()=>{
    const[email,setEmail]=useState("");
        const[password,setPassword]=useState("");
    const handleSubmit=async (e:any)=>{
        e.preventDefault();
        await axios.post("http://localhost:3000/Signup",{
        email,
        password
    })
        console.log(email,password)
}
    return(
        <>
        <div className="flex justify-center items-center h-screen w-screen ">
             <form  onSubmit={handleSubmit}className="flex  bg-gray-400 shadow-lg  flex-col justify-center items-center h-[300px] px-10 rounded-md">
            <input type="text" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}  className="border focus:ring px-3 my-5 rounded-md bg-slate-200"/>
            <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" className="border px-3  focus:ring-2 border-blue-900 bg-slate-200 rounded-md mb-3"/>
            <button type="submit"className="cursor-pointer bg-blue-900 text-white rounded-md px-3 font-bold">Submit</button>
            </form>
        </div>
       
        </>
    )
}
export default Signup