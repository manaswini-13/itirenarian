/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gothic: ["UnifrakturMaguntia", "serif"],
        display: ["Cinzel", "serif"],
        body: ["EB Garamond", "serif"],
      },
    },
  },
  plugins: [],
};
