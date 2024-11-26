"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Menu, MoveRight, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { navData, navVariants } from "../../data/NavbarData";
import MobileNav from "./MobileNav";
import Logo from "@/images/Giftechies-Logo-light-mode.svg";
import darkLogo from "@/images/Giftechies-Logo-dark-mode.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

  useMotionValueEvent(scrollY, "change", (latest) => {
    setAtTop(latest < 10);

    if (latest > lastScrollY && latest > 350) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    setLastScrollY(latest);
  });

  return (
    <motion.header
      variants={navVariants}
      animate={hidden ? "hidden" : "visible"}
      initial="visible"
      className={`fixed left-0 right-0 top-0 z-50 flex justify-center transition-all duration-300 ease-in-out ${atTop ? "w-full" : "mt-0"} shadow-lg`}
    >
      <nav
        className={`transition-all duration-300 ease-in-out w-full bg-primary`}
      >
        <div className={`mx-auto px-0 transition-all duration-300 ease-in-out bg-primary`}>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="py-4 text-lg font-medium text-secondary lg:py-0 h-[72px] pl-2 sm:bg-primary-light inline-flex items-center justify-center"
            >
              {theme === 'dark' ? (
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
                    <div className="bg-primary-light absolute -left-40 top-3/4 mt-2 hidden w-[900px] rounded-2xl  p-8 shadow-lg group-hover:block">
                      <div className="grid grid-cols-3 gap-8">
                        <div className="space-y-6">
                          {item.submenu.columnOne.map((service) => (
                            <Link
                              key={service.title}
                              href={service.href}
                              className="group/item block"
                            >
                              <div className="flex items-center justify-between">
                              <h3 className="mb-1 text-[15px] font-medium text-secondary">
                                {service.title}
                              </h3>
                              <ArrowRight className="h-4 w-4 text-secondary"/>
                              </div>
                              <p className="text-[13px] text-secondary-light transition-colors group-hover/item:text-secondary tracking-wide">
                                {service.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                        
                        <div className="space-y-6">
                          {item.submenu.columnTwo.map((service) => (
                            <Link
                              key={service.title}
                              href={service.href}
                              className="group/item block"
                            >
                              <div className="flex items-center justify-between">
                              <h3 className="mb-1 text-[15px] font-medium text-secondary">
                                {service.title}
                              </h3>
                              <ArrowRight className="h-4 w-4 text-secondary"/>
                              </div>
                              <p className="text-[13px] text-secondary-light transition-colors group-hover/item:text-secondary tracking-wide">
                                {service.description}
                              </p>
                            </Link>
                          ))}
                        </div>

                        {/* Third Column - 2 services */}
                        <div>
                          <div className="space-y-6">
                            {item.submenu.additionalServices.map((service) => (
                              <Link
                                key={service.title}
                                href={service.href}
                                className="group/item block"
                              >
                                <div className="flex items-center gap-2 justify-between">
                                <h3 className="mb-1 text-[15px] font-medium text-secondary">
                                  {service.title}
                                </h3>
                                <ArrowRight className="h-4 w-4 text-secondary"/>
                                </div>
                                <p className="text-[13px] text-secondary-light transition-colors group-hover/item:text-secondary tracking-wide">
                                  {service.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                          
                          {/* Preview Image below 2 services */}
                          <div>
                            {/* <h3 className="text-xl font-medium text-secondary mb-2">
                              {item.submenu.preview.title}
                            </h3>
                            <p className="text-sm text-secondary-light mb-4">
                              {item.submenu.preview.description}
                            </p> */}
                            <div className="rounded-xl overflow-hidden mt-3">
                              <Image
                                width={200} 
                                height={200}
                                src={item.submenu.preview.image}
                                alt={item.submenu.preview.title}
                                className="h-36 w-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center h-[72px]">
              <button
                onClick={toggleTheme}
                className="bg-primary-light text-secondary-light px-6 lg:px-4 h-full"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-6 w-6" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </button>
              <Link
                href="/contact"
                className="gradient-color h-[72px] hidden w-full text-center text-[17px] text-tertiary-text lg:inline-flex items-center px-6 justify-center"
              >
                Start a project <MoveRight className="ml-2" size={20} />
              </Link>
              <button
                className="gradient-color  p-2 text-secondary lg:hidden  px-6 lg:px-0  h-full"
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
