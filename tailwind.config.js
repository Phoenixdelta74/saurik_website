/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F9F8',
        surface: '#FFFFFF',
        ink: {
          primary: '#102A43',
          secondary: '#486174',
          muted: '#526B7E',
        },
        accent: {
          teal: '#076E63',
          'teal-dark': '#066358',
          'teal-light': '#E1F2ED',
          blue: '#2456A6',
          'blue-dark': '#1B4282',
          'blue-light': '#EBF2FC',
        },
        border: {
          subtle: '#D6E1E5',
          hover: '#BCCCDC',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px -2px rgba(16, 42, 67, 0.06), 0 1px 4px -1px rgba(16, 42, 67, 0.04)',
        'card-hover': '0 12px 24px -6px rgba(16, 42, 67, 0.1), 0 4px 8px -2px rgba(16, 42, 67, 0.06)',
        subtle: '0 1px 3px rgba(16, 42, 67, 0.05)',
      },
      borderRadius: {
        control: '8px',
        panel: '14px',
      },
    },
  },
  plugins: [],
};
