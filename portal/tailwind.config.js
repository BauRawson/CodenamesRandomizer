export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Neutral B&W palette — colour comes from game cards and the logo
          orange: '#111111',           // CTA / interactive (was orange, now near-black)
          'orange-light': '#333333',   // hover
          cream: '#F8F9FA',            // page background
          peach: '#F1F3F5',            // subtle highlight / elevated bg
          surface: '#FFFFFF',          // card background
          navy: '#111111',             // dark text / footer
          pink: '#FF4D8D',             // keep for NEW badges only
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
