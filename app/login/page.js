"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function Login(){

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        setErrorMessage(""); // Clear previous errors

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setErrorMessage(error.message); 
        } else {
            router.push("/dashboard");
        }
    };


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
           {errorMessage ? (
                <div className="alert alert-error text-sm text-red-600 bg-red-100 p-2 rounded mb-3">
                    {errorMessage}
                 </div>
            ) : null}


            <button
                onClick={handleLogin}
                className="btn btn-primary w-full">
                    Login
                </button>

    </div>




        </div>

    )


}