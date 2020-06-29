// level
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier/react',
    'plugin:prettier/recommended',
  ],
  plugins: ['import', '@typescript-eslint', 'react', 'react-hooks', 'unused-imports'],
  rules: {
    'arrow-parens': [ERROR, 'as-needed'],
    'class-methods-use-this': WARNING,
    'comma-dangle': [ERROR, 'always-multiline'], // 不允许或强制在对象字面量或者数组属性的结尾使用逗号
    'consistent-return': OFF,
    'dot-notation': OFF,
    'eqeqeq': [ERROR, 'smart'],
    'global-require': OFF,
    'indent': [OFF, 2],
    'no-await-in-loop': OFF,
    'no-bitwise': OFF,
    'no-case-declarations': OFF,
    'no-console': OFF,
    'no-irregular-whitespace': OFF,
    'no-mixed-operators': OFF,
    'no-multi-spaces': ERROR,
    'no-nested-ternary': OFF,
    'no-param-reassign': OFF, // 不允许对函数的形参进行赋值
    'no-plusplus': OFF,
    'no-restricted-syntax': OFF,
    'no-return-assign': OFF,
    'no-unused-expressions': OFF, // 不允许使用断路和三目运算
    'no-void': OFF, // 使用void关键字
    'one-var': WARNING,
    'padded-blocks': OFF, // 规定代码块前后是否要加空行
    'prefer-destructuring': OFF,
    'prefer-object-spread': OFF, // 首选展开运算
    'prefer-spread': ERROR, // 首选展开运算
    'quotes': [ERROR, 'single'], // 引号类型
    'semi': [ERROR, 'always'], // 语句强制分号结尾
    'space-infix-ops': ERROR, // 中缀操作符周围要不要有空格
    // prettier
    'prettier/prettier': ERROR,
    // imports
    'import/no-extraneous-dependencies': OFF,
    'import/no-named-as-default': OFF,
    'import/no-unresolved': OFF,
    'import/order': ERROR,
    'import/prefer-default-export': OFF,
    'unused-imports/no-unused-imports-ts': WARNING,
    'unused-imports/no-unused-vars-ts': OFF,
    // typescript
    '@typescript-eslint/dot-notation': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/indent': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-unused-expressions': [ERROR, { allowShortCircuit: true }],
    '@typescript-eslint/no-unused-vars': OFF, // 声明但是未引用
    '@typescript-eslint/no-var-requires': OFF, // 禁止使用require
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    // a11y
    'jsx-a11y/anchor-is-valid': OFF,
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/control-has-associated-label': OFF,
    'jsx-a11y/img-redundant-alt': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,
    // react
    'react-hooks/exhaustive-deps': WARNING, // 检查 effect 的依赖
    'react-hooks/rules-of-hooks': ERROR, // 检查 Hook 的规则
    'react/destructuring-assignment': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/no-array-index-key': WARNING,
    'react/no-find-dom-node': OFF,
    'react/state-in-constructor': OFF,
    'react/static-property-placement': OFF,
  },
  settings: {
    'import/resolver': {
      webpack: {},
      typescript: {},
    },
  },
};
