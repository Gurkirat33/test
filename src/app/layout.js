import "./globals.css";
import NavbarComponent from "@/components/UI/Navbar/NavbarComponent";
import FooterComponent from "@/components/UI/FooterComponent";
import { Poppins } from 'next/font/google'
import { ThemeProvider } from "@/context/ThemeContext";
import MobileMenu from "@/components/MobileMenu";

export const metadata = {
  title: "Web Development company in Ludhiana- Giftechies",
  description: "Giftechies is a leading Web Development company in Ludhiana, offering top-notch digital marketing and IT solutions to help your business thrive online.",
  keywords:["web development company in india","web development services","custom web development services","mobile app development","custom mobile app development","best digital marketing services in india","Digital marketing services"]
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
    <html lang="en" className={`${poppins.variable} light`} suppressHydrationWarning>
      <body suppressHydrationWarning>
          <MobileMenu/>
        <ThemeProvider>
          <NavbarComponent />
          {children}
          <FooterComponent />
        </ThemeProvider>
      </body>
    </html>
  );
}
