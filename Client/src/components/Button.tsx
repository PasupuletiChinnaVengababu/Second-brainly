import type { ReactElement } from "react";

interface ButtonInterface {
  variant: "primary" | "secondary";
  content: string;
  icon?: ReactElement;
  open?:boolean;
  setOpen?:any
}
const colors: any = {
  primary:
    "bg-blue-400  cursor-pointer text-lg text-gray-300  px-6 py-2 w-40 flex justify-center items-center my-4 rounded-lg mx-5 hover:bg-blue-800 transition-all duration-1000",
  secondary:
    "bg-pink-400   cursor-pointer px-6 text-lg py-2 text-white w-40 rounded-lg border flex justify-center items-center my-4 hover:bg-pink-800 transition-all duration-1000",
};

const Button = ({ variant, content, icon,open,setOpen }: ButtonInterface) => {
  return (
    <div className="bg-gray-200">
      <button onClick={()=>setOpen(true)} className={colors[variant] + " " + " flex items-center gap-3"}>
        {icon}
        {content}
      </button>
    </div>
  );
};

export default Button;
