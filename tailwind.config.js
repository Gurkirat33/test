/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {  
      backgroundImage: {
        "stripes-white":
          "linear-gradient(45deg, white 12.5%, transparent 12.5%, transparent 50%, white 50%, white 62.5%, transparent 62.5%, transparent 100%)",
        "grid-white":
          "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
        "dot-white": "radial-gradient(circle, #ffffff10 1px, transparent 1px)",
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundSize: {
        stripes: "5px 5px",
      },
      colors: {
        "primary":"rgba(var(--primary))",
        "primary-light":"rgba(var(--primary-light))",
        "secondary":"rgba(var(--secondary))",
        "secondary-light":"rgba(var(--secondary-light))",
        "tertiary-text":"rgba(var(--tertiary-text))",
        "border":"rgba(var(--border))",
        "extra-bg":"rgba(var(--extra-bg))"
      },
    },
  },
  plugins: [],
};
