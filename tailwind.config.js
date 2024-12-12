/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // keyframes: {
      //   'slide-in-up': {
      //     '0%': {
      //       transform: 'translate3d(0, 100%, 0)',
      //     },
      //     '100%': {
      //       transform: 'translate3d(0, 0, 0)',
      //     },
      //   },
      //   'slide-in-right': {
      //     '0%': {
      //       display: 'block',
      //       transform: 'translate3d(50%, 0, 0)',
      //     },
      //     '100%': {
      //       transform: 'translate3d(0, 0, 0)',
      //     },
      //   },
      //   'opacity-in-show': {
      //     '0%': {
      //       opacity: '0',
      //     },
      //     '25%': {
      //       opacity: '0.25',
      //     },
      //     '50%': {
      //       opacity: '0.5',
      //     },
      //     '100%': {
      //       transform: 'translate3d(0, 0, 0)',
      //     },
      //   },
      // },
      // animation: {
      //   slideinup: 'slide-in-up 1s ease-in-out 0.25s 1',
      //   slideinright: 'slide-in-right 1s ease-in-out 0.25s 1',
      //   opacityInShow: 'opacity-in-show 1s ease-in-out 0.25s 1',
      // },
    },
  },
  plugins: [],
};
