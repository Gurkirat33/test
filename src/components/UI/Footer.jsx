import React from "react";
import Link from "next/link";
import {
  IndiaFlagSvg,
  links1,
  links2,
  socialLinks,
  UsaFlagSvg,
} from "../data/FooterData";
import { Heart, Mail, PhoneCall } from "lucide-react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="overflow-x-hidden relative bg-primary px-4 pb-8 pt-28 text-secondary sm:px-8">
      <div className="section-container relative rounded-2xl bg-primary-light pb-12 pt-16">
        <div className="absolute left-0 top-0 z-50 flex flex-col gap-1 bg-primary pb-4 pr-4">
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              className="gradient-color flex size-8 items-center justify-center rounded-full text-tertiary-text transition-transform duration-200 hover:scale-110"
            >
              {social.icon}
            </Link>
          ))}
        </div>
        <div className="z-1 absolute left-0 top-36 h-16 w-12 rounded-br-3xl bg-primary"></div>

        <div className="grid grid-cols-12 gap-12 pr-1 sm:pl-14 sm:pr-8 lg:pl-20 lg:pr-12 xl:gap-2
         xl:pl-20 xl:pr-16">
          <div className="col-span-12 flex flex-col gap-6 pl-14 sm:pl-0 md:col-span-6 lg:order-1 lg:col-span-3">
            <img src="https://giftechies.com/frontend/assets/images/cup-man.gif" alt="" className="size-36"/>
            {/* <p className="text-3xl font-semibold lg:text-4xl">
              Do you like <br /> what you see?
            </p> */}
            <h4 className="text-2xl">Ready? Let’s Talk
            </h4>
            {/* <p className="text-xs tracking-wide">Our clients love to work with us because we strive to first meet their requirements and then exceed their expectations.

</p> */}
            <div className="flex gap-4">
            <button className="gradient-color w-fit  px-4 py-2 text-tertiary-text">
           Best Work
            </button>
            <button className="w-fit border border-gray-300 bg-white  px-4 py-2 text-secondary">
              Start Project
            </button>
            </div>
          </div>
          <div className="col-span-8 mb-12 bg-primary p-8 shadow-2xl md:col-span-6 md:-mt-32 lg:order-4 lg:col-span-4 relative">
          {/* <div className="absolute w-full top-0 h-1 gradient-color left-0"></div> */}
            <form>
              <h3 className="mb-3 text-2xl font-semibold lg:text-3xl">
                Get in touch
              </h3>
              <div className="mt-2 flex flex-col gap-3">
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  className="border-b border-secondary-light bg-primary p-3 shadow-sm focus:outline-none"
                />
              </div>
              <div className="mt-2 flex flex-col gap-3">
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  className="border-b border-secondary-light bg-primary p-3 shadow-sm focus:outline-none"
                />
              </div>
              <div className="mt-2 flex flex-col gap-3">
                <input
                  type="number"
                  id="number"
                  placeholder="Phone Number"
                  className="border-b border-secondary-light bg-primary p-3 shadow-sm focus:outline-none"
                />
              </div>
              <div className="mt-2 flex flex-col gap-3">
                <textarea
                  placeholder="Message"
                  type="text"
                  rows={2}
                  id="message"
                  className="border-b border-secondary-light bg-primary p-3 shadow-sm focus:outline-none"
                />
              </div>

              <button className="gradient-color mt-6 w-fit px-4 py-2 text-tertiary-text">
                Submit
              </button>
            </form>
          </div>
          <div className="col-span-12 md:col-span-6 sm:text-start lg:order-2 lg:col-span-3">
            <h3 className="mb-3 text-base font-semibold">Services</h3>
            <ul className="space-y-2 text-secondary-light">
              {links1.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-6 sm:text-start lg:order-3 lg:col-span-2">
            <h3 className="mb-3 text-base font-semibold">Services</h3>
            <ul className="space-y-2 text-secondary-light">
              {links2.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pb-8 lg:flex-row lg:px-12 xl:pt-6">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:pl-14 lg:w-fit lg:gap-8 lg:pl-0">
            <div className="flex flex-1 flex-col md:items-start sm:items-start lg:gap-3 xl:flex-row xl:items-end xl:gap-5">
              <img
                src="/footer1.svg"
                alt="img"
                className="size-36 lg:mx-0 lg:h-full lg:w-full svg-color-mode"
              />
              <p className="max-w-52 description-text">
                PC Tower 2nd Floor, Gill Rd, Opposite GNE College, Ludhiana
                141006 - INDIA
              </p>
            </div>
            <div className="sm:item-start flex flex-1 flex-col  text-center lg:gap-3 xl:flex-row xl:items-end xl:gap-5 xl:text-start">
              <img
                src="/footer2.svg"
                alt="img"
                className="size-36 lg:mx-0 lg:h-full lg:w-full svg-color-mode"
              />
              <p className="max-w-52 description-text">
                1111 Charlene Lane, Schaumburg, IL 60193, United States
              </p>
            </div>
          </div>
          <div className="mt-8 flex w-full flex-1 flex-col gap-3 sm:flex-row sm:pl-14 lg:mt-0 lg:w-fit lg:flex-none lg:pl-4 xl:gap-12 text-secondary-light">
            <div className="flex flex-1 flex-col items-center gap-2 sm:items-start lg:items-start">
              <div className="flex items-center gap-3">
                <IndiaFlagSvg />
                <p>+91 95920 00818</p>
              </div>
              <div className="flex items-center gap-3">
                <UsaFlagSvg />
                <p>+1 (630) 523-0006</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-4 sm:items-start">
              <div className="flex items-center gap-3">
                <Mail className="text-[#d92662]" size={20}/>
                <p> info@giftechies.com</p>
              </div>
              <div className="flex gap-2">
                <PhoneCall className="text-[#d92662]" size={20}/>
                <p>skype.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 text-xs sm:flex-row sm:px-12">
          <p className="text-base font-medium flex items-center gap-1">Made with  <Heart className="text-red-500" fill="red" size={18} /> in India.</p>
          <p className="text-sm text-secondary-light">&copy; {date} Giftechies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
