/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:'#008080',
        secondary: '#d11a2a',
      },
    },
    screens: {
      'ssm': '360px',
    },
  },
  plugins: [],
}

