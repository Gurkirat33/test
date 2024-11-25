import "./globals.css";
import NavbarComponent from "@/components/UI/Navbar/NavbarComponent";
import FooterComponent from "@/components/UI/FooterComponent";
import { Poppins } from 'next/font/google'
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "Web development company: Giftechies",
  description: "Created by Gurkirat Singh",
};

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
      <body suppressHydrationWarning>
        <ThemeProvider>
          <NavbarComponent />
          {children}
          <FooterComponent />
        </ThemeProvider>
      </body>
    </html>
  );
}
