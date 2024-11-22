import "./globals.css";
import NavbarComponent from "@/components/UI/Navbar/NavbarComponent";
import FooterComponent from "@/components/UI/FooterComponent";
import { Poppins } from 'next/font/google'

export const metadata = {
  title: "Agency Website",
  description: "Created by Gurkirat Singh",
};

const themeScript = `
  let prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let stored = localStorage.getItem('theme');
  
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
`;

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-poppins',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <NavbarComponent />
        {children}
        <FooterComponent />
      </body>
    </html>
  );
}
