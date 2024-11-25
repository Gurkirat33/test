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
          href: "/services/ui-ux-design",
        },
        {
          title: "Digital Marketing",
          description: "SEO, SEM, and social media marketing",
          href: "/services/digital-marketing",
        },
        {
          title: "Cloud Solutions",
          description: "Cloud infrastructure and deployment",
          href: "/services/cloud-solutions",
        },
        {
          title: "DevOps Services",
          description: "Continuous integration and deployment",
          href: "/services/devops",
        },
      ],
      additionalServices: [
        {
          title: "IT Consulting",
          description: "Strategic technology consulting and planning",
          href: "/services/consulting",
        },
        {
          title: "Maintenance & Support",
          description: "Ongoing maintenance and technical support",
          href: "/services/maintenance",
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
