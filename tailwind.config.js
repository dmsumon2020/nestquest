/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable class-based dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bannerBg: "url('/src/assets/banner.jpg')",
      },
      colors: {
        bodyColor: "#7A7A7A",
        primaryColor: "#14B8A6",
        headingColor: "#222222",
        sectionBgColor: "#F0F4F7",
        primaryColorHover: "#000",
        agentSocialBg: "rgba(74, 74, 76, 0.5)",
      },
      fontFamily: {
        headingFont: ["Cormorant Garamond", "sans-serif"],
        subheadingFont: ["Great Vibes", "serif"],
      },
    },
  },
  plugins: [],
};
