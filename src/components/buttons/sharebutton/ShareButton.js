"use client"
import React, { useEffect, useState } from 'react';

const ShareButton = ({ style }) => {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this page!',
          url: currentUrl,
        });
        console.log('Thanks for sharing!');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      console.error('Web Share API not supported.');
    }
  };

  return (
    <button className={style} onClick={handleShare}>
      Share
    </button>
  );
};

export default ShareButton;
