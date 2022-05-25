module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    "@tailwindcss/forms",
    "@tailwindcss/typography",
    "@gradin/tailwindcss-scrollbar",
    "flowbite/plugin"
  ],
}