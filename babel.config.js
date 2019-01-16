module.exports = {
  'env': {
    'test': {
      'presets': [
        [
          '@babel/preset-env',
        ],
        '@babel/preset-react',
      ],
    },
  },
  'presets': [
    [
      '@babel/preset-env',
      {
        'modules': false,
      },
    ],
    '@babel/preset-react',
  ],
  'plugins': [
    'transform-dev',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-proto-to-assign',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-function-bind',
    [
      '@babel/plugin-proposal-decorators',
      {
        'legacy': true,
      },
    ],
    [
      '@babel/plugin-proposal-pipeline-operator',
      {
        'proposal': 'minimal',
      },
    ],
    'react-hot-loader/babel',
  ],
};
