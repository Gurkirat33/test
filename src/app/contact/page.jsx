import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Breadcrumb from "@/components/UI/Breadcrumb";

const contactData = [
  {
    icon: Phone,
    text: "Phone",
    description: "+01 234 567 8902",
  },
  {
    icon: Mail,
    text: "Email",
    description: "sayhello@example.me",
  },
  {
    icon: MapPin,
    text: "Address",
    description: "123 Business Street, City, Country",
  },
];

const ContactPage = () => {
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
            {contactData.map((item, index) => (
              <div className="flex items-center space-x-4" key={index}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                  <item.icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-secondary-light">
                    {item.text}
                  </div>
                  <div className="text-secondary">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-primary-light p-8">
          <form>
            <h3 className="mb-3 text-2xl font-semibold text-secondary lg:text-3xl">
              Get in touch
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                className="rounded-lg border border-border bg-primary p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-light"
              />
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <input
                type="text"
                id="email"
                placeholder="Email"
                className="rounded-lg border border-border bg-primary p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-light"
              />
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <input
                type="number"
                id="number"
                placeholder="Phone Number"
                className="rounded-lg border border-border bg-primary p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-light"
              />
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <textarea
                placeholder="Write Your Requirements"
                type="text"
                rows={4}
                id="message"
                className="rounded-lg border border-border bg-primary p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-light"
              />
            </div>

            <button className="gradient-color mt-6 w-fit  px-4 py-2 text-tertiary-text">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    <div className="flex w-full gap-12 mt-12">
      <div className="flex-1">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.898502032196!2d75.85647407528319!3d30.861516579397783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a828f446c36cb%3A0x732e6bc33a024690!2sPC%20Tower!5e0!3m2!1sen!2sin!4v1732516702036!5m2!1sen!2sin" style={{width:"100%",border:"none"}} height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div className="flex-1">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2963.8544102444757!2d-88.11029322422385!3d42.024855556213446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fa8dfa56a1c31%3A0x78acd517f46ab059!2s1111%20Charlene%20Ln%2C%20Schaumburg%2C%20IL%2060193%2C%20USA!5e0!3m2!1sen!2sin!4v1732528063251!5m2!1sen!2sin" style={{width:"100%",border:"none"}} height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
    </>
  );
};

export default ContactPage;
