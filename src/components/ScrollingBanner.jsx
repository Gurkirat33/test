import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ScrollingBanner = () => {
  const contactItems = [
    { icon: Phone, text: "Call us: +91 95920 00818" },
    { icon: Mail, text: "info@giftechies.com" },
    { icon: Phone, text: "+1 (630) 523-0006" },
    { icon: Clock, text: "Mon-Fri: 9AM-6PM" },
  ];

  const doubledItems = [...contactItems, ...contactItems,...contactItems];

  return (
    <div className="w-full overflow-hidden gradient-color text-tertiary-text py-4">
      <div className="relative flex">
        <div className="slide-track-left   flex space-x-8 whitespace-nowrap">
          {doubledItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 px-4">
              <item.icon className="size-5" />
              <span className="text-lg font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;
