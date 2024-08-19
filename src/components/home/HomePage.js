"use client"

import React from 'react'
import style from './HomePage.module.css'
import BlogCard from '../cards/blogscard/BlogCard'



async function fetchBlogs() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blogs`, {
    cache: "no-store",
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }

  const response = await res.json();
  console.log(response);
  return response;
}


const HomePage = async ()  => {
  const data = await fetchBlogs();
  return (
    <div className={style.homewrapper}>
    {data?.blogs?.map((item,index)=>(
        <BlogCard blogs={item} key={index}/>
    ))

    }

    </div>
  )
}

export default HomePage