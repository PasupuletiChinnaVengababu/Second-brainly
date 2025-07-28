import { useEffect, useState } from "react";
import PlusIcon from "./PlusIcon";
import ShareIcon from "./ShareIcon";
import axios from "axios";

const Card = () => {
  const [link, setLink] = useState(
    "https://x.com/marryevan999/status/1949475215152656708"
  );
  const [title,setTitle]=useState("")
  const [datas,setData]=useState([])
   async function getData (){
    const {data}=await axios.get("http://localhost:3000/Content",
        {
           headers: {
            'Authorization':  localStorage.getItem('token')  
        }
    }
    )
    setData(data);
    
    
       
  }
  useEffect(()=>{
    getData()
  },[])
  console.log(datas);
  return (
    <div className="bg-gray-200 min-h-screen  w-screen px-30 py-30">
      <div className="flex  flex-wrap gap-4">
        {datas?.map((d)=>(
            <>
            {d.title=="youtube"? <div className="bg-white border shadow-md px-3 py-3  text-gray-600 max-w-72 rounded-lg">
          <div className="flex justify-between gap-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
            </div>
            <div className="flex gap-3">
              <div>
                <ShareIcon />
              </div>
              <div>
                <PlusIcon />
              </div>
            </div>
          </div>
          <iframe
            className="w-full border rounded-md mt-3"
            height="315"
            src={`https://www.youtube.com/embed/${d.link}`}
           
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
            :
             <div className="bg-white border shadow-md px-3 py-3  text-gray-600 max-w-72 rounded-lg">
          <div className="flex justify-between gap-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
            </div>
            <div className="flex gap-3">
              <div>
                <ShareIcon />
              </div>
              <div>
                <PlusIcon />
              </div>
            </div>
          </div>
          <blockquote className="twitter-tweet">
            {" "}
            <a href={d.link.replace("x", "twitter")}></a>
          </blockquote>
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </div>}
            </>
           
        ))}
        
       
      </div>
    </div>
  );
};
export default Card;
