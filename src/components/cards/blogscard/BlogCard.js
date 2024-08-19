"use client"
import React from 'react';
import Link from 'next/link';
import style from './BlogCard.module.css';
import ShareButton from '@/components/buttons/sharebutton/ShareButton';
import parse from 'html-react-parser';

const BlogCard = ({ blogs }) => {
  const MAX_LENGTH = 201;
  const getTruncatedContent = (content) => {
    if (!content) return '';
    const truncated = content.length > MAX_LENGTH
      ? content.substring(0, MAX_LENGTH) + '...'
      : content;
    return truncated;
  };

  const description = getTruncatedContent(blogs?.content || '');

  return (
    <div className={style.blogmaincard}>
      <h2 className={style.blogtitle}>
        {blogs?.title}
      </h2>
      {/* <h6 className={style.blogcontent}>
        {parse(description)}
      </h6> */}
      <br />
      <div className={style.buttons}>
        <Link href={`/blogs/${blogs?.slug}`}>View More</Link>
        <ShareButton style={style.sharebutton} />
      </div>
    </div>
  );
};

export default BlogCard;
