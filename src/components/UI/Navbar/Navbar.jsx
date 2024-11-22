"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Menu, MoveRight } from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "../../DarkModeToggle";
import { navData, navVariants } from "../../data/NavbarData";
import MobileNav from "./MobileNav";
import Logo from "@/images/Giftechies-Logo-light-mode.svg";
import darkLogo from "@/images/Giftechies-Logo-dark-mode.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const theme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setIsDarkMode(theme === "dark");
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setAtTop(latest < 10);

    if (latest > lastScrollY && latest > 350) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    setLastScrollY(latest);
  });

  // To remove scrollbar when nav is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      variants={navVariants}
      animate={hidden ? "hidden" : "visible"}
      initial="visible"
      className={`fixed left-0 right-0 top-0 z-50 flex justify-center transition-all duration-300 ease-in-out ${atTop ? "w-full" : "mt-0"} shadow-lg`}
    >
      {/*   ${
          atTop
            ? "w-full bg-primary"
            : "w-[90%] rounded-full bg-primary/90 shadow-lg xl:w-[80%]"
        } */}
      <nav
        className={`transition-all duration-300 ease-in-out w-full bg-primary
        
        `}
      >
        <div className={`mx-auto px-0 transition-all duration-300 ease-in-out bg-primary`}>
          <div className="flex items-center justify-between ">
            <Link
              href="/"
              className="py-4 text-lg font-medium text-secondary lg:py-0 h-[72px] pl-2 sm:bg-primary-light inline-flex items-center justify-center"
            >
              {isDarkMode ? (
                <Image src={darkLogo} alt="" width={210} className="p-3" />
              ) : (
                <Image src={Logo} alt="" width={210} className="p-3" />
              )}
            </Link>

            <div className="hidden items-center lg:flex">
              {navData.map((item) => (
                <div
                  key={item.name}
                  className={`group relative pr-6 transition-colors ${
                    atTop ? "py-6" : "py-4"
                  }`}
                >
                  <Link 
                    href={item.href} 
                    className={`flex items-center ${
                      pathname === item.href 
                        ? "text-pink-500 underline decoration-pink-500  underline-offset-[30px]" 
                        : "text-secondary-light hover:text-secondary"
                    }`}
                  >
                    {item.name}
                    {item.submenu && (
                      <svg
                        className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>

                  {item.submenu && (
                    <div className="absolute left-0 top-3/4 mt-2 hidden w-[600px] rounded-2xl bg-primary p-8 shadow-lg group-hover:block">
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                          {item.submenu.items.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="group/item block"
                            >
                              <h3 className="mb-1 text-xl font-medium text-secondary">
                                {subItem.title}
                              </h3>
                              <p className="text-sm text-secondary-light transition-colors group-hover/item:text-secondary">
                                {subItem.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-xl font-medium text-secondary">
                            {item.submenu.preview.title}
                          </h3>
                          <p className="text-secondary-light">
                            {item.submenu.preview.description}
                          </p>
                          <div className="mt-4 overflow-hidden rounded-xl">
                            <img
                              src={item.submenu.preview.image}
                              alt={item.submenu.preview.title}
                              className="h-48 w-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center h-[72px]">
              <DarkModeToggle
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
              <Link
                href="/contact"
                className="gradient-color h-[72px] hidden w-full  text-center text-[17px] text-tertiary-text lg:inline-flex items-center px-6 justify-center"
              >
                Start a project <MoveRight className="ml-2 " size={20}/>
              </Link>
              <button
                className="gradient-color  p-2 text-secondary lg:hidden  px-6 sm:pl-0 sm:pr-0 h-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu size={21} className="text-white"/>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <MobileNav
        navData={navData}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </motion.header>
  );
};

export default Navbar;
