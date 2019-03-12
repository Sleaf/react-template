const plugins = [
  require('postcss-preset-env')({
    autoprefixer: { grid: "autoplace" },
    browsers: ['> 1%', 'last 2 versions'],
  })
];

module.exports = {
  parser: require('postcss-safe-parser'),
  plugins
};
