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
          description: "Custom web applications and solutions",
          href: "/services/web-development",
        },
        {
          title: "Mobile Development",
          description: "Native and cross-platform mobile apps",
          href: "/services/mobile-development",
        },
        {
          title: "E-commerce Solutions",
          description: "Online store development and optimization",
          href: "/services/ecommerce-development",
        },
        {
          title: "WordPress Development",
          description: "Custom WordPress websites and plugins",
          href: "/services/wordpress-development",
        },
      ],
      columnTwo: [
        {
          title: "UI/UX Design",
          description: "User-centered design solutions",
          href: "/services/ui",
        },
        {
          title: "Print / Graphic Design",
          description: "SEO, SEM, and social media marketing",
          href: "/services/print-graphic-design",
        },
        {
          title: "Branding",
          description: "Cloud infrastructure and deployment",
          href: "/services/branding",
        },
        {
          title: "Logo Design",
          description: "Continuous integration and deployment",
          href: "/services/logo-design",
        },
      ],
      additionalServices: [
        {
          title: "Front End & Responsive HTML",
          description: "Strategic technology consulting and planning",
          href: "/services/front-end",
        },
        {
          title: "SEO",
          description: "Ongoing maintenance and technical support",
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
