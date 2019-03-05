const plugins = [
  require('autoprefixer')({
    grid: "autoplace",
    browsers: ['> 1%', 'last 2 versions', 'ie >= 10'],
  })
];

module.exports = {
  parser: require('postcss-safe-parser'),
  plugins
};
