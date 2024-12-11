/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'slide-in-up': {
          '0%': {
            visibility: 'visible',
            transform: 'translate3d(0, 100%, 0)',
          },
          '100%': {
            transform: 'translate3d(0, 0, 0)',
          },
        },
        'slide-in-right': {
          '0%': {
            visibility: 'visible',
            transform: 'translate3d(100%, 0, 0)',
          },
          '100%': {
            transform: 'translate3d(0, 0, 0)',
          },
        },
      },
      animation: {
        slideinup: 'slide-in-up 1s ease-in-out 0.25s 1',

        slideinright: 'slide-in-right 1s ease-in-out 0.25s 1',
      },
    },
  },
  plugins: [],
};
