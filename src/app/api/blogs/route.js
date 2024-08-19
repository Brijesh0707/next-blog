import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DataBaseConnection";
import Blog from "@/models/Blog";

dbConnect();

export async function GET(request) {
  try {
    const blogs = await Blog.find({}); 

    return NextResponse.json({ status: 200, blogs });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
