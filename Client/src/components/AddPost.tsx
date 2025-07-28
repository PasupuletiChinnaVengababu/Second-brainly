import {  useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";


interface opened{
    open:boolean;
    setOpen:any
}

const AddPost = ({open,setOpen}:opened) => {
    const navigate=useNavigate();
    const[link,setLink]=useState("");
    const[title,setTitle]=useState("");
  const handleClick= async (e:any)=>{
    e.preventDefault()
    const {data}=await axios.post("http://localhost:3000/Create",{
        link,
        title},
        {
        headers: {
    'Authorization':  localStorage.getItem('token')
  }

    })
    console.log(data)
    setOpen(false)
    navigate("/home")
    

  }
 

  return (
    <>
      {open && (
        <div className="bg-black opacity-60 h-screen w-screen absolute flex justify-center items-center flex-col">
            
          <div className=" bg-white shadow-xl flex flex-col items-center justify-center h-[300px] rounded-xl w-[400px] relative">
            <h1 className="text-black  absolute text-3xl top-0 right-1 cursor-pointer" onClick={()=>setOpen(false)}>X</h1>
            <input  value={link}onChange={(e)=>setLink(e.target.value)} className="focus focus:ring-2 mx-2 border-2 mb-4 bg-gray-300 rounded-md w-1/2 border-blue-500" type="text" placeholder="link" />
            <input  value={title} onChange={(e)=>setTitle(e.target.value)} className="mx-2 border  bg-red-300 rounded-md w-1/2 border-blue-500" type="text"  placeholder="title"/>
            <button onClick={handleClick} >Submit</button>     
          </div>
          
        </div>
      )}
    </>
  );
};
export default AddPost;
