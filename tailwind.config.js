module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    '@tailwindcss/forms',
    '@tailwindcss/typography',
    '@headlessui/tailwindcss',
    '@gradin/tailwindcss-scrollbar',
    'flowbite/plugin',
  ],
}