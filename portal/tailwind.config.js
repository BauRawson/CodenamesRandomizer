export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Accent (was orange, now a cool blue)
          orange: '#4D7EFF',
          'orange-light': '#6B92FF',
          // Dark surfaces
          cream: '#0B1120',      // page background
          peach: '#1A2340',      // elevated surface / highlights
          surface: '#111827',    // card background
          // Keep navy dark for nav/footer/gameplay bars
          navy: '#1A1A2E',
          // Badges
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
