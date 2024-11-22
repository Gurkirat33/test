export const navData = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Work",
    href: "/work",
    submenu: {
      items: [
        {
          title: "Case Studies",
          description: "Explore our successful projects",
          href: "/",
        },
        {
          title: "Portfolio",
          description: "Browse our latest work",
          href: "/",
        },
        {
          title: "Blogs",
          description: "Read our latest blog posts",
          href: "/",
        },
        {
          title: "Client Testimonials",
          description: "See what our clients have to say",
          href: "/",
        },
      ],
      preview: {
        image:
          "/about3.jpeg",
        title: "Our Work",
        description: "Discover how we've helped businesses grow",
      },
    },
  },
  {
    name: "Portfolio",
    href: "/portfolio",
  },
  {
    name: "About",
    href: "/about",
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
