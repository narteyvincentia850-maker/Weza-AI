/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C3FC5',
        'primary-dark': '#5530a0',
        'primary-light': '#8B5CF6',
        accent: '#F5C842',
        'bg-main': '#F9F9F9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
