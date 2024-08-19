"use client";
import React, { useState } from 'react';
import style from './login.module.css';
import Link from 'next/link';

const LoginForm = ({ page }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/${page}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log(data)

      if (data.status!==400) {
        setSuccess(data.message);
        if (page === 'login') {
          localStorage.setItem('user', data?.user?.email)
          localStorage.setItem('token',data?.token)
          window.location.href = '/';
        } else {
          window.location.href = '/login';
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form className={style.main_form} onSubmit={handleSubmit}>
      <label>Email</label><br />
      <input
        type='email'
        required
        placeholder='johndoe@gmail.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />

      <label>Password</label><br />
      <input
        type='password'
        required
        placeholder='john*****'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />

      <button type='submit'>{page === "login" ? "Login" : "Register"}</button>
      <br />
      <br />
      {error && <div className={style.error}>{error}</div>}
      {success && <div className={style.success}>{success}</div>}
      {page === "login" ?
        <Link href="/register">Register</Link>
        :
        <Link href="/login">Login</Link>
      }
    </form>
  );
};

export default LoginForm;
