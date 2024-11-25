'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const storedTheme = await Promise.resolve(localStorage.getItem('theme') || 'light');
        setTheme(storedTheme);
        document.documentElement.classList.add(storedTheme);
      } catch (error) {
        console.error('Error initializing theme:', error);
        // Fallback to light theme if there's an error
        setTheme('light');
        document.documentElement.classList.add('light');
      } finally {
        setMounted(true);
      }
    };

    initializeTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      await Promise.resolve(localStorage.setItem('theme', newTheme));
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
