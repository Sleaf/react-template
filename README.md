# React Template
> - 自用 React 模板， 推荐使用 [yarn](https://yarnpkg.com) 进行包管理，如果要使用 `npm` ，请替换 `package.json` 中相关字段。
> - 不支持 IE ，请自行安装配置 [polyfill](https://babeljs.io/docs/en/babel-polyfill) / shim / sham

## 包含功能/库
### React & 🔥 Reload
- [React Hot Loader](https://github.com/gaearon/react-hot-loader): 实现 Stateful Hot Reload ，完美替代 HMR
- [@hot-loader/react-dom](https://github.com/hot-loader/react-dom): 替换官方 `react-dom` 以支持 `React Hooks`
- [css-hot-loader](https://github.com/shepherdwind/css-hot-loader): 实现 CSS 无刷新热重载
  > 虽然官方表示[ mini-css-extract-plugin ](https://github.com/webpack-contrib/mini-css-extract-plugin#advanced-configuration-example)已经集成，但经测试，目前的版本并不可用。  
- 支持官方 React.lazy 分块，并封装于 `src/utils/hocs/LazyPageWrapper.tsx`

### Babel
> 可访问 [Awesome Babel](https://github.com/babel/awesome-babel) 自行安装喜欢的插件
- [官方支持的proposal](https://github.com/babel/proposals) 相关插件 
- [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash) 实现自动部分导入
- [babel-jest(已整合进Jest)](https://github.com/facebook/jest#using-babel) 可在测试中编写现代 JS / TS 

### TypeScript
> - 由于使用 Babel 编译，部分 TypeScript 特性无法使用。
> - 参见 [TypeScript With Babel: A Beautiful Marriage](https://iamturns.com/typescript-babel/) | [[译] TypeScript 和 Babel：美丽的结合](https://juejin.im/post/5c8f4dcb5188252db02e404c)
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript): ⚡️快如闪电⚡️
- [fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin): 在编译阶段进行类型检查

### Https自签支持（localhost）
> - **警告**：工程内的证书秘钥等仅为调用特殊浏览器API提供测试开发，用于生产是**根本不安全**的。
> - 需使用 `yarn dev-https` 以启用该功能。
> - [ localCA.key ](https://github.com/Sleaf/react-template/blob/master/ssl/localCA.key)的 `pass phrase` 为 _sleaf1996_ ，证书内容均为个人相关字样
> - [ localhost.csr ](https://github.com/Sleaf/react-template/blob/master/ssl/localhost.csr)的 `challenge password` 为 _sleaf1996_ ，证书内容均为个人相关字样
- [证书格式转换](https://vimsky.com/article/3608.html)
- [在各环境中安装自签名证书](https://github.com/Sleaf/react-template/blob/master/docs/certificates.md)

### Mock 服务器
> 使用 `yarn dev-mock` 启用 mock 服务器，如需同时启用 HTTPS 请使用 `yarn dev-mock --https`
- 在 `webpack.dev.ts`> `devServer` > [before](https://webpack.js.org/configuration/dev-server/#devserverbefore) 注入对应函数实现 mock 服务器
- 实现函数在 `mockServer/index.ts` 中，请根据样例和[ Express 官方文档 ](http://expressjs.com/zh-cn/4x/api.html)编辑使用。

### [docsify](https://docsify.js.org/#/zh-cn/quickstart) 文档支持
> 使用 `yarn doc-dev` 启用 docsify 服务器，即可在 3202 端口查看编写的文档
- 文档在 `./docs` 目录中，
  > - `./develop` 为开发文档（**对内**）
  > - `./help` 为帮助文档（**对外**）
- 支持 [markdown](https://www.markdown.cn/) 语法。

### 其他
- **less**: 可自行在`webpack.common.ts`中替换为 sass / stylus 等配置
- **postcss**: 支持 grid 布局，相关现代CSS支持
- **webpack-bundle-analyzer**: 使用`yarn analyze`分析生产包结构
- **why-did-you-update**: 将 react 组件渲染情况在控制台输出（在`src/index.tsx`中按需开启）

## 待添加的功能
- ~~多预编译器支持（参考vue-cli）~~
- 国际化方案支持
- 多主题方案支持
- ESLint + prettier 支持
