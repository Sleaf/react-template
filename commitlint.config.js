// level
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'body-leading-blank': [WARNING, 'always'],
    'body-max-line-length': [ERROR, 'always', 100],
    'footer-leading-blank': [WARNING, 'always'],
    'footer-max-line-length': [ERROR, 'always', 100],
    'header-max-length': [ERROR, 'always', 100],
    'scope-case': [ERROR, 'always', 'lower-case'],
    'subject-case': [ERROR, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [ERROR, 'never'],
    'subject-full-stop': [ERROR, 'never', '.'],
    'type-case': [ERROR, 'always', 'lower-case'],
    'type-empty': [ERROR, 'never'],
    'type-enum': [
      ERROR,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
    ],
  },
};
