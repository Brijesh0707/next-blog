"use client"
import React, { useEffect, useState } from 'react';
import style from './Navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
  }, []);

  return (
    <header className={style.navbar_main}>
      <nav className={style.navbar}>
        <div className={style.logo}>
          <Link href={"/"}>
            <h1>BrijBlogs</h1>
          </Link>
        </div>
        {user ? (
          <>
            <Link href={"/createblog"}>Create</Link>
          </>
        ) : (
          <div className={style.link}>
            <Link href={"/login"}>Login</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
