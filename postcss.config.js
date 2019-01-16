const plugins = [
  require('autoprefixer')({
    browsers: ['> 1%', 'last 2 versions', 'ie >= 9']
  })
];

module.exports = {
  parser: require('postcss-safe-parser'),
  plugins
};
