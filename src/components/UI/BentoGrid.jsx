
import { ArrowRight, MoveDown, MoveRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import gridData from "../data/gridData";
import Image from "next/image";
import { CallButton } from "./CallButton";

const getGridClasses = (index) => {
  if (index === 1)
    return "max-lg:order-0 row-span-1 col-span-2 lg:col-span-2 lg:row-span-2 gradient-color flex flex-col items-center gap-4";
  if (index === 6 || index === 7)
    return "row-span-1 col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col justify-end gap-2";
  return "col-span-2 lg:col-span-1 row-span-1 max-lg:order-1";
};


export default function BentoGrid() {
  return (
    <div className="relative py-12">
      <Link href="/contact" className="hidden transalent absolute left-1/2 top-1/2 z-10 lg:flex size-80 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary shadow-lg">
        <Image
          src="/services2.svg"
          alt=""
          fill
          className="scale-[0.8]"
        />
      </Link>
      <div className="section-container grid grid-cols-1 md:grid-cols-4 grid-rows-4 gap-4 lg:gap-6">
        {gridData.map((item, index) => {
          if (item.isSpecial) {
            return (
              <div
                key={index}
                className={`${getGridClasses(index)} rounded-lg p-10 text-tertiary-text relative`}
              >
                <p className="mt-4 text-lg tracking-widest">{item.title}</p>
                <h3 className="text-center  text-2xl lg:text-4xl font-semibold tracking-wide">
                  {item.description}
                </h3>
                <p className="text-center text-sm tracking-wider">Our clients love to work with us because we strive to first meet their requirements and then exceed their expectations.

</p>
                <MoveDown className="animate-bounce" />
                <div className="flex gap-4">
                <Link href="/services" className="inline-flex items-center gap-2 mt-2 lg:mt-0  border border-white font-medium px-4 py-2 text-sm">
                  View All Services 
                </Link>
                <CallButton/>
                
                </div>
              </div>
            );
          }

          return (
            <div
              key={index}
              className={`${getGridClasses(index)} relative rounded-lg bg-primary px-8 py-7 shadow-xl`}
            >
              {item.icon && <item.icon size={26} className="text-red-500" />}
              <h3 className="my-3 text-xl font-medium">{item.title}</h3>
              <p className="description-text text-[14px]">
                {item.description}
              </p>
              <Link href={item.link} className="text-sm group mt-4 flex items-center gap-2">
                <ArrowRight
                  size={19}
                  className="-rotate-45 cursor-pointer transition-all duration-300 group-hover:rotate-0"
                />
                <span>View More</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
