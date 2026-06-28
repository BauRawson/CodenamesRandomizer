export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6B35',
          'orange-light': '#FF8C5A',
          peach: '#FFE5D0',
          cream: '#FFF8F5',
          navy: '#1A1A2E',
          pink: '#FF4D8D',
        },
      },
      fontFamily: {
        display: ['Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
