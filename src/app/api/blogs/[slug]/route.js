import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/DataBaseConnection';
import Blog from '@/models/Blog';


dbConnect();

export async function GET(request, { params }) {
  const { slug } = params;

  try {
    const blog = await Blog.findOne({ slug });

    console.log(blog)

    if (!blog) {
      return NextResponse.json({ status: 404, message: 'Blog not found' });
    }
    return NextResponse.json({ status: 200, blog });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: 'Internal Server Error',error,slug });
  }
}
