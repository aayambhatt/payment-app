"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/lib/ProtectedRoute";

export default function Dashboard() {

    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(()=>{
      const checkUser = async () => {
        const {data: {user}} = await supabase.auth.getUser();

        if(!user){
          router.push("/login");
        }
        else{
          setUser(user);
        }
      }
      checkUser();
    },[])


  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <ProtectedRoute>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center ml-20">
        <div className="card-body">
        <h1 className="text-2xl font-bold mb-4 text-gray-500">Welcome to Dashboard</h1>
        <p className="text-center text-gray-700">
          {user ? `Logged in as ${user.email}` : "Loading..."}
        </p>
        <button 
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
          Logout
        </button>
        </div>
       
        
      </div>
      <div className="mockup-phone border-primary mt-10">
  <div className="camera"></div>
  <div className="display">
    <div className="artboard artboard-demo phone-1"> 
      
      {/* Image Section */}
      <div className="mb-4 flex justify-center">
        <img 
          src="https://blog.razorpay.in/blog-content/uploads/2024/02/Razorpay-Payment-Gateway-3.0-1.jpg" 
          alt="Razorpay Payment Gateway"
          className="w-full rounded-lg"
        />
      </div>

      {/* takes to pay page */}
      <button
   onClick={() => router.push("/pay")} // 
  className="btn btn-primary w-full mt-4"
      >
    Go to payment gateway
    </button>

      
    </div>
  </div>
</div>
      
      </div>
  

    </ProtectedRoute>
  );
}
