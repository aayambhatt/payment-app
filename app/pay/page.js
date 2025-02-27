"use client";

import { useState, useEffect } from "react";

export default function Pay() {
    const [amount, setAmount] = useState("");

    useEffect(() => {
        // Load Razorpay script dynamically
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handlePayment = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount!");
            return;
        }

        try {
            // Call API to create a Razorpay order
            const res = await fetch("/api/razorpay", { // ✅ Updated API route
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: amount * 100 }), // Convert INR to paise
            });

            const data = await res.json();

            if (!data.orderId) {
                alert("Failed to create order. Please try again.");
                return;
            }

            // Initialize Razorpay checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use your Razorpay public key
                amount: amount * 100,
                currency: "INR",
                name: "Your Company Name",
                description: "Test Transaction",
                order_id: data.orderId, // Order ID from Razorpay
                handler: function (response) {
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Something went wrong! Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="card w-full max-w-md bg-white shadow-xl p-6 rounded-lg">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Enter your amount</h1>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                    placeholder="Enter Amount"
                    className="input input-bordered w-full mt-4 p-2 border rounded-md text-black"
                />

                <button
                    onClick={handlePayment}
                    className="btn btn-primary w-full mt-4 bg-blue-500 text-white p-2 rounded"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
}






















// "use client";

// import { useState } from "react";


// export default function Pay(){

// const [amount, setAmount] = useState("");

// const handlePayment = () => {
//     if(!amount || isNaN(amount) || amount<=0){
        
//     }

// }

// return (

//     <div className="min-h-screen flex items-center justify-center bg-gray-100">

//         <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
//             <h1 className="text-2xl font-bold text-gray-500">Enter your amount</h1>

//             <input
//             type="number"
//             value={amount}
//             onChange={(e)=> setAmount(e.target.value)}
//             placeholder="Enter Amount"
//             className="input input-bordered w-full mt-4"
//             />
//             <button
//           onClick={() => console.log("Button Clicked!")}
//           className="btn btn-primary w-full mt-4"
//             >
//             Pay Now
//             </button>
        
//          </div>


//     </div>


// )


// }