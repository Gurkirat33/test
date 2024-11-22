import React from "react";
import { Phone, Mail, MapPin, Globe, Clock } from "lucide-react";

const ScrollingBanner = () => {
  const contactItems = [
    { icon: Phone, text: "Call us: +91 12345-67890" },
    { icon: Mail, text: "Email: hello@example.com" },
    { icon: MapPin, text: "123 Business Street, City, Country" },
    { icon: Globe, text: "www.giftechies.com" },
    { icon: Clock, text: "Mon-Fri: 9AM-6PM" },
  ];

  const doubledItems = [...contactItems, ...contactItems];

  return (
    <div className="w-full overflow-hidden gradient-color text-tertiary-text py-4">
      <div className="relative flex">
        <div className="slide-track-left   flex space-x-8 whitespace-nowrap">
          {doubledItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 px-4">
              <item.icon className="size-6" />
              <span className="text-lg font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;
