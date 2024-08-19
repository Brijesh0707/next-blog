"use client";
import React, { useState, useEffect } from 'react';
import style from './CreateBlogForm.module.css';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateBlogForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState(null);  
  const router = useRouter(); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);  

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!token) {
      setError('No authentication token found.');
      return;
    }

    try {
      const response = await fetch('/api/newblogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ title, content: description }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        router.push('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter your blog title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <ReactQuill
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Write your blog description..."
        required
      />
      <br />
      <button type='submit'>Submit</button>
      <br />
      {error && <div className={style.error}>{error}</div>}
      {success && <div className={style.success}>{success}</div>}
    </form>
  );
};

export default CreateBlogForm;
