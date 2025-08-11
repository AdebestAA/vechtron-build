"use client"
import React, { useEffect, useState } from 'react'

type typeTheme = "light" | "dark"
const UseChangeThemeMode = () => {
    const [theme, setTheme] = useState< typeTheme>('light');

    useEffect(() => {
      const storedStorageTheme = localStorage.getItem('theme') as  typeTheme;
      if (storedStorageTheme) {
        setTheme(storedStorageTheme);
        document.documentElement.classList.toggle('dark', storedStorageTheme === 'dark');
      }
    }, []);
  
 
    useEffect(() => {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.classList.toggle('light', theme === 'light');
    }, [theme]);
  
    const toggleTheme = () => {
      setTheme((prev) => (prev == 'light' ? 'dark' : 'light'));
    };

    return {toggleTheme,theme}
}

export default UseChangeThemeMode