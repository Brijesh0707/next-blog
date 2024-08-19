import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DataBaseConnection";
import User from "@/models/User";

dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const isUser = await User.findOne({ email:email });

    if (isUser) {
      return NextResponse.json({ status: 400, message: "User already exists" });
    }

    const newUser = new User({
      email,
      password,
    });

    await newUser.save();

    return NextResponse.json({ status: 201, message: "User registered successfully", user: { email: newUser.email } });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
