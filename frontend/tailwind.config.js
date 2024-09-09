// tailwind.config.js
module.exports = {
  darkMode: 'class', // Correct property name
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the path according to your project structure
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Extend the default Tailwind CSS theme here
      colors: {
        primary: '#1d4ed8',
        secondary: '#6b7280',
        // Add more custom colors as needed
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        // Add more custom spacing values as needed
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};



