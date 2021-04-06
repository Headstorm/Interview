module.exports = {
  purge: {
    mode: 'all',
    preserveHtmlElements: false,
    enabled: true,
    content: ['./*.html'],
  },
  //purge: [],ZZ
  darkMode: 'media', // or 'media' or 'class'
  theme: {
      colors: {
        gray: {
          100: '#eceff4',
          200: '#e5e9f0',
          300: '#d8dee9',
          400: '#4c566a',
          500: '#434c5e',
          600: '#3b4252',
          700: '#2e3440',
        },
        blue: {
          100: '#8fbcbb',
          200: '#88c0d0',
          300: '#81a1c1',
          400: '#5e81ac',
        },
        red: '#bf616a',
        orange: '#d08770',
        yellow: '#ebcb8b',
        green: '#a3be8c',
        purple: '#b48ead',
      },

      fontFamily: {
        sans: ['JetBrains Mono', 'Font Awesome'],
      },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    //require('tailwindcss-theming')({
    //  preset: 'nord', // Change your preset here.
    //}),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
