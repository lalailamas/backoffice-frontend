/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  theme: {
    fontFamily: {
      'albert-sans': ['Albert Sans', 'sans-serif']
    },
    extend: {
      colors: {
        // Tus colores personalizados
        'd-title-purple': '#6b648d',
        'd-dark-dark-purple': '#462b99',
        'd-soft-soft-purple': '#d5d3fb',
        'd-dark-purple': '#504695',
        'd-purple': '#7e4bff',
        'd-soft-purple': '#8c7be5',
        'd-strong-green': '#ddff4c',
        'd-green': '#e7ff6f',
        'd-soft-green': '#d8dcb0',
        'd-dark-gray': '#e8e8d8',
        'd-gray': '#e5e5e3',
        'd-white': '#ffffff'
        // ...
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: [require('daisyui')]
}
