/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/frontend/**/*.{js,ts,jsx,tsx}',
    './app/views/**/*.html.erb',
    './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
