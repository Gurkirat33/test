import { Twitter } from "lucide-react";

export const socialLinks = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.02 5.66 21.13 10.44 21.87V14.9H7.9V12H10.44V9.89C10.44 7.36 11.93 6 14.17 6C15.29 6 16.23 6.1 16.47 6.14V8.65H15.06C13.93 8.65 13.66 9.19 13.66 10V12H16.38L15.98 14.9H13.66V21.87C18.44 21.13 22 17.02 22 12Z" />
  <path d="M15.98 14.9L16.38 12H13.66V10C13.66 9.19 13.93 8.65 15.06 8.65H16.47V6.14C16.23 6.1 15.29 6 14.17 6C11.93 6 10.44 7.36 10.44 9.89V12H7.9V14.9H10.44V21.87C10.96 21.96 11.48 22 12 22C12.52 22 13.04 21.96 13.56 21.87V14.9H15.98Z" fill="white"/>
</svg>

    ),
    href: "#",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="size-4">
      <path
        fill="currentColor"
        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
      />
    </svg>
    ),
    href: "#",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M22 0H2C0.9 0 0 0.9 0 2V22C0 23.1 0.9 24 2 24H22C23.1 24 24 23.1 24 22V2C24 0.9 23.1 0 22 0Z" fill="none"/>
  <path d="M6.94 20.48H3.51V9.03H6.94V20.48ZM5.23 7.7C4.15 7.7 3.26 6.82 3.26 5.74C3.26 4.66 4.14 3.78 5.23 3.78C6.32 3.78 7.2 4.66 7.2 5.74C7.2 6.82 6.32 7.7 5.23 7.7ZM20.73 20.48H17.31V14.7C17.31 13.37 17.28 11.7 15.56 11.7C13.82 11.7 13.56 12.96 13.56 14.6V20.48H10.13V9.03H13.35V10.5H13.4C13.88 9.68 14.87 8.79 16.41 8.79C19.69 8.79 20.73 10.77 20.73 13.71V20.48Z" fill="currentColor"/>
</svg>

    ),
    href: "#",
  },
  {
    icon:<Twitter size={18}/>,
    href: "#",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12.003 0C5.373 0 0 5.373 0 12.003C0 14.55 0.801 16.947 2.173 18.963L0.23 24L5.4 22.113C7.363 23.255 9.638 23.928 12.003 23.928C18.627 23.928 24 18.555 24 12.003C24 5.373 18.627 0 12.003 0ZM12.003 21.918C10.036 21.918 8.121 21.365 6.457 20.342L6.1 20.127L3.399 21.178L4.415 18.657L4.184 18.298C3.036 16.474 2.418 14.292 2.418 12.003C2.418 6.74 6.745 2.413 12.003 2.413C17.27 2.413 21.587 6.74 21.587 12.003C21.587 17.27 17.27 21.918 12.003 21.918Z" fill="#fff"/>
  <path d="M17.546 13.885C17.161 13.646 15.804 12.933 15.464 12.793C15.126 12.652 14.964 12.612 14.785 12.889C14.606 13.165 14.115 13.792 13.935 14.011C13.754 14.23 13.573 14.258 13.188 14.02C12.8 13.781 11.762 13.38 10.877 12.502C10 11.62 9.598 10.585 9.36 10.196C9.122 9.811 9.148 9.629 9.367 9.449C9.586 9.268 10.211 8.779 10.487 8.601C10.764 8.421 10.824 8.261 10.683 7.923C10.543 7.583 9.83 6.225 9.589 5.84C9.351 5.455 9.117 5.527 8.938 5.516C8.762 5.506 8.519 5.506 8.277 5.506C8.036 5.506 7.61 5.611 7.226 5.999C6.841 6.388 6.025 7.114 6.025 8.443C6.025 9.771 6.989 11.064 7.128 11.259C7.268 11.455 8.683 13.6 10.837 14.592C12.99 15.583 13.258 15.416 13.571 15.383C13.883 15.35 15.073 14.601 15.316 14.166C15.56 13.732 15.932 13.743 16.27 13.909C16.608 14.073 17.934 14.729 18.262 14.878C18.591 15.025 18.92 15.09 19.058 14.995C19.198 14.899 19.198 14.408 19.058 14.218C18.919 14.028 17.931 14.124 17.546 13.885Z" fill="white"/>
</svg>

    ),
    href: "#",
  },
];

export const links1 = [
  {
    name: "Mobile Development",
    href: "/services/mobile-development",
  },
  {
    name: "UX/UI/ Web Design",
    href: "/services/ui",
  },
  {
    name: "Web Development",
    href: "/services/web-development",
  },
  {
    name: "Front End & Responsive HTML",
    href: "/services/front-end",
  },
  {
    name: "WordPress Development",
    href: "/services/wordpress-development",
  },
];

export const links2 = [
  {
    name: "E-Commerce Development",
    href: "/services/ecommerce-development",
  },
  {
    name: "Print / Graphic Design",
    href: "/services/print-graphic-design",
  },
  {
    name: "Logo Design",
    href: "/services/logo-design",
  },
  {
    name: "Branding",
    href: "/services/branding",
  },
];

export const IndiaFlagSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 60 40"
  >
    <rect width="60" height="40" fill="#FF9933" />
    <rect width="60" height="26.67" y="13.33" fill="#FFFFFF" />
    <rect width="60" height="13.33" y="26.67" fill="#138808" />
    <circle cx="30" cy="20" r="6" fill="#000088" />
    <circle
      cx="30"
      cy="20"
      r="5.4"
      fill="none"
      stroke="#000088"
      strokeWidth="0.6"
    />
    <g
      fill="none"
      stroke="#000088"
      strokeWidth="0.4"
      transform="translate(30,20)"
    >
      <g id="spokes">
        <line x1="0" y1="-5.4" x2="0" y2="-6" />
        <line x1="0" y1="5.4" x2="0" y2="6" />
        <line x1="-5.4" y1="0" x2="-6" y2="0" />
        <line x1="5.4" y1="0" x2="6" y2="0" />
        <line x1="-3.8" y1="-3.8" x2="-4.2" y2="-4.2" />
        <line x1="3.8" y1="3.8" x2="4.2" y2="4.2" />
        <line x1="-3.8" y1="3.8" x2="-4.2" y2="4.2" />
        <line x1="3.8" y1="-3.8" x2="4.2" y2="-4.2" />
      </g>
      <use href="#spokes" transform="rotate(22.5)" />
      <use href="#spokes" transform="rotate(45)" />
      <use href="#spokes" transform="rotate(67.5)" />
      <use href="#spokes" transform="rotate(90)" />
      <use href="#spokes" transform="rotate(112.5)" />
      <use href="#spokes" transform="rotate(135)" />
      <use href="#spokes" transform="rotate(157.5)" />
      <use href="#spokes" transform="rotate(180)" />
    </g>
  </svg>
);

export const UsaFlagSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 74 39"
  >
    <rect width="74" height="39" fill="#B22234" />
    <rect y="3" width="74" height="3" fill="#FFFFFF" />
    <rect y="9" width="74" height="3" fill="#FFFFFF" />
    <rect y="15" width="74" height="3" fill="#FFFFFF" />
    <rect y="21" width="74" height="3" fill="#FFFFFF" />
    <rect y="27" width="74" height="3" fill="#FFFFFF" />
    <rect y="33" width="74" height="3" fill="#FFFFFF" />
    <rect width="30" height="21" fill="#3C3B6E" />
    <g fill="#FFFFFF">
      <g id="star" transform="translate(2,2)">
        <polygon points="0,1.2 0.3,0.4 1,0.4 0.4,-0.1 0.6,-0.9 0,-0.4 -0.6,-0.9 -0.4,-0.1 -1,0.4 -0.3,0.4" />
      </g>
      <use href="#star" x="4" />
      <use href="#star" x="8" />
      <use href="#star" x="12" />
      <use href="#star" x="16" />
      <use href="#star" x="20" />
      <use href="#star" y="4" />
      <use href="#star" x="4" y="4" />
      <use href="#star" x="8" y="4" />
      <use href="#star" x="12" y="4" />
      <use href="#star" x="16" y="4" />
      <use href="#star" x="20" y="4" />
      <use href="#star" y="8" />
      <use href="#star" x="4" y="8" />
      <use href="#star" x="8" y="8" />
      <use href="#star" x="12" y="8" />
      <use href="#star" x="16" y="8" />
      <use href="#star" x="20" y="8" />
      <use href="#star" y="12" />
      <use href="#star" x="4" y="12" />
      <use href="#star" x="8" y="12" />
      <use href="#star" x="12" y="12" />
      <use href="#star" x="16" y="12" />
      <use href="#star" x="20" y="12" />
      <use href="#star" y="16" />
      <use href="#star" x="4" y="16" />
      <use href="#star" x="8" y="16" />
      <use href="#star" x="12" y="16" />
      <use href="#star" x="16" y="16" />
    </g>
  </svg>
);
