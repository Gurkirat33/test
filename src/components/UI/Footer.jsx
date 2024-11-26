'use client';

import { useState } from "react";
import {
  IndiaFlagSvg,
  links1,
  links2,
  socialLinks,
  UsaFlagSvg,
} from "../data/FooterData";
import { Heart, Mail, MessageCircle } from "lucide-react";
import { ThemeImage } from "./ThemeImage";
import Image from "next/image";
import { submitContactForm } from "@/app/backend/contact/actions";
import Link from "next/link";

const Footer = () => {
  const date = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus({ loading: false, error: null, success: true });
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 3000);
      } else {
        setStatus({ loading: false, error: result.error || "Failed to submit form", success: false });
      }
    } catch (error) {
      setStatus({ loading: false, error: "Something went wrong", success: false });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
          <div className="col-span-12 flex flex-col  pl-14 sm:pl-0 md:col-span-6 lg:order-1 lg:col-span-3">
            <ThemeImage
              darkSrc="/footer5.svg"
              lightSrc="/footer-dark.svg"
              alt=""
              width={52}
              height={52}
              className="h-44 w-52"
            />
            <h4 className="text-2xl mb-6 text-secondary-light">Ready? Let’s Talk
            </h4>
            <div className="flex gap-4">
            <button className="gradient-color w-fit  px-4 py-2 text-tertiary-text">
            Hire Me !
            </button>
            <button className="w-fit border border-border bg-primary  px-4 py-2 text-secondary">
            Best Work
            </button>
            </div>
          </div>
          <div className="col-span-8 mb-12 bg-primary p-8 shadow-2xl md:col-span-6 md:-mt-32 lg:order-4 lg:col-span-4 relative">
          <div className="absolute w-full top-0 h-1 gradient-color left-0"></div>
            <form onSubmit={handleSubmit}>
              <h3 className="mb-3 text-2xl font-semibold lg:text-3xl">
                Get in touch
              </h3>
              <div className="mt-2 flex flex-col gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full  border-b border-border bg-transparent px-4 py-2 text-secondary outline-none "
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full  border-b border-border bg-transparent px-4 py-2 text-secondary outline-none "
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full  border-b border-border bg-transparent px-4 py-2 text-secondary outline-none "
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full  border-b border-border bg-transparent px-4 py-2 text-secondary outline-none "
                ></textarea>
                <button
                  type="submit"
                  disabled={status.loading}
                  className={`gradient-color w-full  px-8 py-2 text-white transition-all hover:opacity-90 disabled:opacity-50 ${
                    status.loading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {status.loading ? "Sending..." : "Send Message"}
                </button>
                {status.error && (
                  <p className="text-red-500 text-sm mt-2">{status.error}</p>
                )}
                {status.success && (
                  <p className="text-green-500 text-sm mt-2">Message sent successfully!</p>
                )}
              </div>
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
              <Image
              width={50}
              height={50}
                src="/footer1.svg"
                alt="img"
                className="size-36 lg:mx-0 lg:h-full lg:w-full svg-color-mode"
              />
              <p className="max-w-52 description-text">
                PC Tower 2nd Floor, Gill Rd, Opposite GNE College, Ludhiana
                141006 - INDIA
              </p>
            </div>
            <div className="sm:item-start flex flex-1 flex-col  lg:gap-3 xl:flex-row xl:items-end xl:gap-5 xl:text-start">
              <Image
              width={50}
              height={50}
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
            <div className="flex flex-1 flex-col  gap-2 sm:items-start lg:items-start">
              <div className="flex items-center gap-3">
                <IndiaFlagSvg />
                <p>+91 95920 00818</p>
              </div>
              <div className="flex items-center gap-3">
                <UsaFlagSvg />
                <p>+1 (630) 523-0006</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col  gap-4 sm:items-start">
              <div className="flex items-center gap-3">
                <Mail className="text-[#d92662]" size={20}/>
                <p> info@giftechies.com</p>
              </div>
              <div className="flex gap-2">
                <MessageCircle className="text-[#d92662]" size={20}/>
                <p>giftechies</p>
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
