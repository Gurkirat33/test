export const navData = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Services",
    href: "/services",
    submenu: {
      columnOne: [
        {
          title: "Web Development",
          description: "Tailored websites and web platforms",
          href: "/services/web-development",
        },
        {
          title: "Mobile Development",
          description: "Efficient native and hybrid app solutions",
          href: "/services/mobile-development",
        },
        {
          title: "E-commerce Solutions",
          description: "Comprehensive e-commerce development",
          href: "/services/ecommerce-development",
        },
        {
          title: "WordPress Development",
          description: "Custom themes and plugins for WordPress",
          href: "/services/wordpress-development",
        },
      ],
      columnTwo: [
        {
          title: "UI/UX Design",
          description: "Innovative and user-focused interfaces",
          href: "/services/ui",
        },
        {
          title: "Print / Graphic Design",
          description: "Creative and impactful graphic designs",
          href: "/services/print-graphic-design",
        },
        {
          title: "Branding",
          description: "Strategic branding for businesses",
          href: "/services/branding",
        },
        {
          title: "Logo Design",
          description: "Memorable and professional logo designs",
          href: "/services/logo-design",
        },
      ],
      additionalServices: [
        {
          title: "Front End & Responsive HTML",
          description: "Responsive and accessible front-end code",
          href: "/services/front-end",
        },
        {
          title: "SEO",
          description: "Comprehensive search engine optimization",
          href: "/services/seo",
        },
      ],   
      preview: {
        image: "/about1.jpeg",
        title: "Our Expertise",
        description: "End-to-end digital solutions for your business growth",
      },
    },
  },
  {
    name: "Portfolio",
    href: "/portfolio",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export const navVariants = {
  visible: {
    y: 0,
    transition: { duration: 0.35, ease: "easeInOut" },
  },
  hidden: {
    y: "-130%",
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};
