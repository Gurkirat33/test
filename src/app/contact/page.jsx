"use client"

import React, { useState, useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Breadcrumb from "@/components/UI/Breadcrumb";
import { submitContactForm } from "@/app/backend/contact/actions";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

const ContactPage = () => {  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState({ loading: false, error: null, success: false });
  const recaptchaRef = useRef(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert("Please verify that you are not a robot");
      return;
    }
    setStatus({ loading: true, error: null, success: false });

    try {
      console.log("form submitting")
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus({ loading: false, error: null, success: true });
        setFormData({ name: "", email: "", phone: "", message: "" });
        recaptchaRef.current.reset();
        setIsVerified(false);
        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: false }));
        }, 3000);
      } else {
        setStatus({ loading: false, error: result.error || "Failed to submit", success: false });
      }
    } catch (error) {
      setStatus({ loading: false, error: "Something went wrong", success: false });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onReCAPTCHAChange = (captchaCode) => {
    if (captchaCode) {
      setIsVerified(true);
    }
  };

  return (
    <>
    <div className="pt-[72px]">
      <Breadcrumb />
    </div>
    <div className="flex items-center bg-primary text-secondary">
      <div className="grid w-full section-container grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="my-auto space-y-8">
          <div>
            <h1 className="mb-4 text-4xl font-medium text-secondary md:text-5xl lg:leading-[1.1]">
              It&apos;s time to talk about your{" "}
              <span className="gradient-color-text">project.</span>
            </h1>
            <p className="text-secondary-light">
              Let&apos;s embark on creative journey together by shaping a visual
              narrative of your brand in the crowded digital space.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4  max-w-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-secondary-light">
                    Phone
                  </div>
                  <Link className="text-secondary" href={"tel:+91 95920 00818"}>+91 95920 00818</Link>
                </div>
              </div>
            <div className="flex items-center space-x-4  max-w-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                  <Mail className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-secondary-light">
                    Email
                  </div>
                  <Link className="text-secondary" href={"mailto:info@giftechies.com"}>info@giftechies.com</Link>
                </div>
              </div>
            <div className="flex items-center space-x-4  max-w-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-secondary-light">
                    Address
                  </div>
                  <Link className="text-secondary" target="_blank" href={"https://www.google.com/maps?q=PC Tower 2nd Floor, Gill Rd, Opposite GNE College, Ludhiana 141006"}>PC Tower 2nd Floor, Gill Rd, Opposite GNE College, Ludhiana 141006 - INDIA</Link>
                </div>
              </div>
          </div>
        </div>

        <div className="rounded-lg bg-primary-light p-8">
          <form onSubmit={handleSubmit}>
            <h3 className="mb-3 text-2xl font-semibold text-secondary lg:text-3xl">
              Get in touch
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="rounded-lg border border-border bg-primary p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-light"
              />
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="rounded-lg border border-border bg-primary p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-light"
              />
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="rounded-lg border border-border bg-primary p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-light"
              />
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <textarea
                placeholder="Write Your Requirements"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className="rounded-lg border border-border bg-primary p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-light"
              />
            </div>

            {/* ReCAPTCHA Component */}
            <div className="mt-4">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LcQ8o8qAAAAANoMwCM3UTRH4DVBrHWo4CKR06Qd"
                size="normal"
                onChange={onReCAPTCHAChange}
              />
            </div>

            <button 
              type="submit"
              disabled={status.loading}
              className={`gradient-color mt-6 w-fit px-4 py-2 text-tertiary-text transition-opacity ${
                status.loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {status.loading ? "Sending..." : "Submit"}
            </button>

            {status.error && (
              <p className="mt-4 text-sm text-red-500">{status.error}</p>
            )}
            {status.success && (
              <p className="mt-4 text-sm text-green-500">Message sent successfully!</p>
            )}
          </form>
        </div>
      </div>
    </div>
    <div className="section-container flex flex-col md:flex-row w-full pb-12 gap-12 mt-12">
      <div className="md:w-[50%] p-4 bg-white shadow-xl">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.898502032196!2d75.85647407528319!3d30.861516579397783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a828f446c36cb%3A0x732e6bc33a024690!2sPC%20Tower!5e0!3m2!1sen!2sin!4v1732516702036!5m2!1sen!2sin" style={{
  width: "100%",
  border: "none",
}}
 height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div className="md:w-[50%] p-4 bg-white shadow-xl">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2963.8544102444757!2d-88.11029322422385!3d42.024855556213446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fa8dfa56a1c31%3A0x78acd517f46ab059!2s1111%20Charlene%20Ln%2C%20Schaumburg%2C%20IL%2060193%2C%20USA!5e0!3m2!1sen!2sin!4v1732528063251!5m2!1sen!2sin" style={{width:"100%",border:"none"}} height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
    </>
  );
};

export default ContactPage;
