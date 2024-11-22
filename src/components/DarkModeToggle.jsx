"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import Script from "next/script";

const themeScript = `
  function getThemePreference() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('theme', theme);
  }

  setTheme(getThemePreference());
`;

const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem("theme") || "light";
    setIsDarkMode(theme === "dark");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return <div className="h-9 w-9" />;
  }

  return (
    <>
      <Script id="theme-switcher" strategy="beforeInteractive">
        {themeScript}
      </Script>
      <button
        onClick={toggleTheme}
        className="dark:bg-primary-500 relative inline-flex h-[72px] items-center justify-center px-4 bg-primary-light focus:outline-none"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Moon className="h-[1.4rem] w-[1.4rem] text-slate-400 transition-all duration-200" />
        ) : (
          <Sun className="h-[1.4rem] w-[1.4rem] text-slate-500 transition-all duration-200" />
        )}
      </button>
    </>
  );
};

export default DarkModeToggle;
