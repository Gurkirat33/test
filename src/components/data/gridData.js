import { Laptop, BarChart2, Code, ShoppingCart, PenTool, Smartphone, Shield, LifeBuoy, Globe } from 'lucide-react';

const gridData = [
  {
    title: "Mobile Development",
    description: "Mobile platform represents both a unique opportunity and unique challenge in the business world.",
    icon: Smartphone,
    link:"/services/mobile-development",
    conent:() => (
      <div className="relative w-fit mx-auto">
      <span className="text-[120px] md:text-[150px] lg:text-[200px] font-bold leading-none text-secondary opacity-10">
        13
      </span>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-secondary">
        <span className="text-lg md:text-xl font-medium">Years of</span>
        <br />
        <span className="text-2xl md:text-3xl font-bold">Excellence</span>
      </div>
    </div>
    )
  }, 
  {
    title: "GifTechies",
    description: "Your Digital Success Starts with Our Expertise",
    isSpecial: true,
  },
  {
    title: "UX/UI & Web Design",
    description: "Ensuring that the visual structure & presentation of information on a website are correlated with the users’ mental expectations.",
    icon: PenTool ,
    link:"/services/ui"
  },
  {
    title: "Web Development",
    description: "Quality web design is now affordable with Giftechies as we ensure our clients get the unique and inexpensive website.",
    icon: Globe,
    link:"/services/web-development"
  },
  {
    title: "WordPress Development",
    description: "WordPress is the largest Open Source content management platform used globally and holds the largest share..",
    icon: Laptop,
    link:"/services/wordpress-development"
  },
  {
    title: "Print / Graphic Design",
    description: "In a way or other, graphic design is the part of almost everything we do at Giftechies. Delivering creative graphics and..",
    icon: ShoppingCart,
    link:"/services/print-graphic-design"
  },
  {
    title: "E-Commerce Development",
    description: "We build user-friendly and scalable e-commerce solutions that are easy-to- manage and designed to give your brand the very best online store presence possible. Our e-commerce development services ensure you get all the features required to run a successful online selling business.",
    icon: Shield,
    link:"/services/ecommerce-development"
  },
  {
    title: "Front End & Responsive HTML",
    description: "A website is nothing without responsive frontend design as almost 90% of internet surfing is done though compact devices. Today, it makes sense to build a website that is fully responsive and interactive that stands apart from the usual templates.",
    icon: PenTool,
    link:"/services/front-end"
  },
  {
    title: "Logo Design",
    description: "A great logo is the first step towards building a great brand. As an expert logo design company with great experience..",
    icon: LifeBuoy,
    link:"/services/logo-design"
  },
  {
    title: "Branding",
    description: "Your company’s branding should convey what makes it special. Branding can help set your business apart from competitors.",
    icon: Code,
    link:"/services/branding"
  },
  {
    title: "SEO",
    description: "Driving growth with tailored strategies for SEO, social media, and online advertising.",
    icon: BarChart2,
    link:"/services/seo"
  }
  
];

export default gridData;
