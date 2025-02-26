"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function Login(){

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({email, password});

        if(error){
            alert(error.message);
        }
        else{
            alert("Login successfull"); 
            router.push("/dashboard");
        }
    }


    return(

        <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-slate-100 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-4 text-gray-500" >Login</h1>

            <input 
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your mail"
                className="text-gray-700 w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
             <input 
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
                className="text-gray-700 w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Login
                </button>

    </div>




        </div>

    )


}