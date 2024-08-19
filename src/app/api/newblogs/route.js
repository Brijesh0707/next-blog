import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DataBaseConnection";
import jwt from "jsonwebtoken";
import Blog from "@/models/Blog";


dbConnect();

const JWT_SECRET = process.env.JWT_SECRET || "thisisanotherscrete";  

export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ status: 401, message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ status: 401, message: "Unauthorized: Invalid token" });
    }
    const reqBody = await request.json();
    const { title, content } = reqBody;
    const newBlog = new Blog({
      title,
      content,
      user: decoded.id,  
    });
    await newBlog.save();
    return NextResponse.json({ status: 201, message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
