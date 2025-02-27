"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./supabase";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // To handle loading state

    useEffect(() => {
        const checkUser = async () => {
            const { data, error } = await supabase.auth.getUser();

            if (error || !data.user) {
                router.push("/login");
            } else {
                setUser(data.user);
            }

            setLoading(false);
        };

        checkUser();
    }, []);

    if (loading) return <p>Loading...</p>;  

    return user ? children : null;  
}
