module.exports = {
  purge: [],
  important: '.vue3-emojipicker',
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      transparent: 'transparent',
      grey: {
        100: '#B9BBBE',
        200: '#71777D',
        300: '#4F545C',
        400: '#2F3136',
        500: '#292B2F',
        600: '#212224',
        700: '#292B2F'
      }
    },
    extend: {
    },
  },
  variants: {
    extend: {
      filter: ['hover', 'focus'],
    },
  },
  plugins: [],
}
