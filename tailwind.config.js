module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        c6: "1fr repeat(4, 300px) 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
