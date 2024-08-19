import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DataBaseConnection";
import jwt from "jsonwebtoken";
import User from "@/models/User";


dbConnect();

const JWT_SECRET = process.env.JWT_SECRET || "thisisanotherscrete";  

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ status: 400, message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return NextResponse.json({ status: 400, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);


    const response = NextResponse.json({ status: 200, message: "Login successful", user: { email: user.email } ,token});
    response.cookies.set("token", token, {
      httpOnly: true,  
    });

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
