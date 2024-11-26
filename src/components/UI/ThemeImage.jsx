'use client';

import Image from "next/image";
// import { useTheme } from "@/context/ThemeContext";

export function ThemeImage({ lightSrc, darkSrc, ...props }) {
  // const { theme } = useTheme();
  const theme = "Dark"
  const src = theme === 'dark' ? darkSrc : lightSrc;
  
  return <Image src={src} {...props} />;
}
