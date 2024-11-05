// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        sm: "648px",
        md: "768px",
        lg: " 1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        primary: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
