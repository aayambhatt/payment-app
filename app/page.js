"use client";
import { useRouter } from "next/navigation"


export default function Home () {

  const router = useRouter();

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-5xl mt-48 text-center font-bold text-lime-300">Welcome to My Payment App</h1>
      <div className="flex justify-center gap-4 mt-10">
      <button className="btn  btn-success" onClick={()=> router.push("/login")}>Login to your account</button>
      <button className="btn  btn-primary" onClick={()=> router.push("/register")}>Create a new account</button>
      </div>
    

    </div>
  )
}
