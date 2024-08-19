import React from 'react';
import style from './indiblogs.module.css';
import ShareButton from '@/components/buttons/sharebutton/ShareButton';


async function fetchBlogData(slug) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/blogs/${slug}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch blog data');
  }

  const data = await response.json();
  return data.blog;
}


const IndividualBlogs = async ({ params }) => {
  const { blogid } = params;
  let blog;
  try {
    blog = await fetchBlogData(blogid);
  } catch (error) {
    console.error('Error fetching blog data:', error);
    blog = null;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <section className={style.IndividualBlogs_wrapper} style={{paddingTop:"30px"}}>
      <ShareButton style={style.sharebutton}/>
      <br />
      <br />
      <div className={style.blog_title}>
        <h1>{blog.title}</h1>
      </div>
      <br />
      <div className={style.blog_content}>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </section>
  );
};

export default IndividualBlogs;
