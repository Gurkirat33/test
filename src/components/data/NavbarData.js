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
      items: [
        {
          title: "Mobile Development",
          description: "Explore our successful projects",
          href: "/",
        },
        {
          title: "Web Development",
          description: "Browse our latest work",
          href: "/",
        },
        {
          title: "UX/UI & Web Design",
          description: "Read our latest blog posts",
          href: "/",
        },
        {
          title: "WordPress Development",
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
