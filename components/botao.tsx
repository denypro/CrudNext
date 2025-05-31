import { ButtonHTMLAttributes } from "react";

interface Buttonprops extends ButtonHTMLAttributes<HTMLButtonElement>{
 name:string
}

export default function Botao({name, className}:Buttonprops){
    return(
        <div className="mt-2">
            <button className={`bg-blue-500 py-3 px-2 w-full rounded-md ${className}`}>{name}</button>
        </div>
    )
}