import { NextResponse } from "next/server";

export async function POST(request) { // Add "request" parameter
    try {
        const { RAZORPAY_KEY_ID, RAZORPAY_SECRET } = process.env;

        if (!RAZORPAY_KEY_ID || !RAZORPAY_SECRET) {
            return NextResponse.json({ error: "Razorpay keys missing" }, { status: 500 });
        }

        // Get the request body (amount from frontend)
        const body = await request.json();
        const amountInPaise = body.amount; // Already in paise from frontend

        const res = await fetch("https://api.razorpay.com/v1/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_SECRET}`).toString("base64")}`,
            },
            body: JSON.stringify({
                amount: amountInPaise, // Use dynamic amount
                currency: "INR",
                receipt: "order_rcptid_11",
            }),
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
        }

        const data = await res.json();
        return NextResponse.json({ orderId: data.id });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}




























// import Razorpay from "razorpay";
// import { NextResponse } from "next/server";

// // Create a new Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// // Handle POST requests (Creating an order)
// export async function POST(req) {
//   try {
//     const body = await req.json(); // Get JSON body properly

//     const currency = body.currency || "INR"; // Default to INR if not provided
//     if (!body.amount) {
//     return NextResponse.json({ success: false, message: "Amount is required" }, { status: 400 });
//     }


//     const options = {
//         amount: body.amount * 100,
//         currency, // Use default or provided currency
//         receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
//       };
      

//     // Create the Razorpay order
//     const order = await razorpay.orders.create(options);

//     return NextResponse.json({ success: true, order });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
