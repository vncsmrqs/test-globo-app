const defaultColors = require('tailwindcss/colors');

const breakpoints = {
  xs: '360px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1650px',
};

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./resources/**/*.js', './resources/**/*.vue'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      ...breakpoints,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: defaultColors.black,
      white: defaultColors.white,
      primary: {
        light: 'var(--color-primary-light)',
        DEFAULT: 'var(--color-primary)',
        dark: 'var(--color-primary-dark)',
      },
      secondary: {
        light: 'var(--color-secondary-light)',
        DEFAULT: 'var(--color-primary)',
        dark: 'var(--color-secondary-dark)',
      },
      danger: {
        light: defaultColors.red['100'],
        DEFAULT: defaultColors.red['500'],
        dark: defaultColors.red['800'],
      },
      success: {
        light: defaultColors.green['100'],
        DEFAULT: defaultColors.green['600'],
        dark: defaultColors.green['800'],
      },
      warn: {
        light: defaultColors.yellow['100'],
        DEFAULT: defaultColors.yellow['400'],
        dark: defaultColors.yellow['600'],
      },
      ...defaultColors,
    },
    extend: {
      boxShadow: {
        1: 'var(--shadow-1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
