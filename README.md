# React Template
> 自用React模板

## 包含库/功能
### React & React-hot-loader & Css-hot-loader
- 带状态的热重载，完美替代HMR
- 已使用`@hot-loader/react-dom`替换官方`react-dom`
- 支持开发模式下`css-hot-loader`css文件热重载
- 支持官方React.lazy分块，并封装于`src/utils/hocs/LazyPageWrapper.tsx`

### Babel
> 可访问[Awesome Babel](https://github.com/babel/awesome-babel)自行安装喜欢的插件
- `typescript` 使用`@babel/preset-typescript`~~和[fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin)实现~~
- `lodash` 实现自动部分导入
- `jest` 可编写现代 JS / TS
- [`react-directive`](https://github.com/evolify/babel-plugin-react-directive) 支持像Vue一样编写`v-if`/`v-for` 
- [官方支持的所有proposal](https://github.com/babel/proposals)相关插件

### Https自签支持（localhost）
> - **警告**：工程内的证书秘钥等仅为调用特殊浏览器API提供测试开发，用于生产是**根本不安全**的。
> - 需在 `webpack.dev.js` 文件中修改`ENABLE_SSL`为`true`以启用该功能。
> - localCA.key的pass phrase为sleaf1996，证书内容均为个人相关字样
> - localhost.csr的challenge password为:sleaf1996，证书内容均为个人相关字样
- [证书格式转换](https://vimsky.com/article/3608.html)
- [各环境中安装自签名证书](https://github.com/Sleaf/react-template/blob/master/docs/certificates.md)

### 其他
- less 可自行在`webpack.common.js`中替换为 sass / stylus 等配置
- postcss 支持 grid 布局，同时将最低兼容浏览器提升至 IE10
- webpack-bundle-analyzer 使用`npm run analyze`分析生产包结构
- cross-env 可在 Windows 上设置环境变量
- why-did-you-update 提示 react 组件渲染（自行开启）

## 待添加的功能
- ~~多预编译器支持（参考vue-cli）~~
- 多主题方案支持
- 国际化方案支持
- Mock 方案支持
