const __isTest__ = process.env.NODE_ENV === 'test';
const envConfig = {
  modules: __isTest__ && 'auto',
};

module.exports = {
  'presets': [
    ['@babel/preset-env', envConfig],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  'plugins': [
    // prepaer
    '@babel/plugin-transform-runtime',
    /* follow https://github.com/babel/proposals */
    // Stage 0
    '@babel/plugin-proposal-function-bind',
    // Stage 1
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { 'loose': false }],
    '@babel/plugin-proposal-do-expressions',
    // Stage 2
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    // Stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-json-strings',
    // Others
    'lodash', // A simple transform to cherry-pick Lodash modules so you don’t have to.
    // Hot Reload
    'react-hot-loader/babel',
  ],
};
