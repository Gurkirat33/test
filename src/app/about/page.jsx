import AboutMission from "@/components/UI/AboutMission";
import { SectionHeading } from "@/components/UI/SectionHeading";
import TeamSection from "@/components/UI/TeamSection";

import Image from "next/image";

export default function AboutPage() {
  const stats = [
    { number: "150+", label: "Projects Delivered" },
    { number: "100+", label: "Industries Served" },
    { number: "98%", label: "Client Satisfaction" },
  ];

  const features = [
    { title: "Innovative Ideas" },
    { title: "Robust Development" },
    { title: "Dedicated Support" },
  ];

  return (
    <div className="bg-primary text-secondary pt-20">
        <SectionHeading title={"Where Innovation Meets Excellence"} description={"We provide comprehensive digital solutions, from web design and development to marketing and branding, helping businesses thrive in the digital world."}/> 
      <div className="section-container">

        <section className="w-full py-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="relative grid grid-cols-2 grid-rows-2 gap-4">
              <div className="absolute right-0 z-40 rounded-lg bg-primary-light p-6 text-center">
                <p className="text-2xl text-secondary">13</p>
                <p className="text-xl text-secondary">Years</p>
              </div>
              <div className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl">
                <Image
                  src="/about3.jpeg"
                  alt="Team collaboration"
                  className="h-full w-full object-cover"
                  fill
                />
              </div>
              <div className="relative col-span-1 row-span-1 mt-12 overflow-hidden rounded-2xl">
                <Image
                  src="/about1.jpeg"
                  width={200}
                  height={300}
                  alt="Creative process"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative col-span-1 row-span-1 overflow-hidden rounded-2xl">
                <Image
                  src="/about2.jpeg"
                  alt="Design work"
                  className="h-full w-full object-cover"
                  width={200}
                  height={300}
                />
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="mb-3 text-sm lg:text-base font-semibold gradient-color-text">
                  Why Choose Us
                </h4>
                <h2 className="mb-8 text-4xl font-semibold text-secondary">
                  Crafting Digital Excellence with Innovation and Precision
                </h2>

                <div className="mb-8 grid grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="rounded-xl pr-4">
                      <h3 className="mb-1 text-2xl lg:text-3xl font-semibold lg:font-bold text-secondary">
                        {stat.number}
                      </h3>
                      <p className="text-sm font-medium text-secondary-light">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mb-8 leading-relaxed text-secondary-light">
                Giftechies is a next-generation, dynamic company, solely dedicated at providing you turn-key solutions in the area of web development & designing. Our team of experts delivers digital solutions that actually work & exceed your expectations.
We understand the importance of portrayal of digital images and come up with something amazing and each piece of web solution design for your requirements is done keeping in mind your business model, ethics, beliefs and image. Our strong belief in on-time delivery and cost-efficiency has inspired us to offer state-of- the-art web design & development services to global clients.
                </p>

                <div className="flex flex-wrap gap-4">
                  {features.map((feature, index) => (
                    <p
                      key={index}
                      className="rounded-lg font-medium bg-primary-light px-6 py-3 text-secondary"
                    >
                      {feature.title}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <AboutMission/>
        <TeamSection />
      </div>
    </div>
  );
}
