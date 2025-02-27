"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const {error }= await supabase.auth.signUp({email, password});
     if(error){
        alert(error.message);
    }
    else{
        alert('Check your email to confirm!');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-500">Register</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="text-gray-700 w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className=" text-gray-700 w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Sign Up
      </button>
    </div>
  </div>
  );
}