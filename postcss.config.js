module.exports = {
  parser: require('postcss-safe-parser'),
  plugins: [
    require('postcss-preset-env')({
      autoprefixer: { grid: "autoplace" },
    }),
  ],
};
