import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App.tsx';
import ready from '@/ready.ts';
import { setTagTitle, removeElement, removeClass } from '@/utils/domLib.ts';
import pkg from '../package.json';
import '@/styles/index.less';

//debug
if (__isDev__) {
  // //why-did-you-render
  // const whyDidYouRender = require('@welldone-software/why-did-you-render');
  // whyDidYouRender(React, { include: [/^./] }); // rewrite you want here
}

//page onLoaded
ready().then(() => {
  // 移除 loading 效果
  removeClass(document.getElementById('body'), 'body-loading');
  removeElement(document.getElementById('sk-cube-grid'));
  setTagTitle(pkg.name);//fixme: replace to your website name
  //mount react-dom
  ReactDOM.render(<App />, document.getElementById('root'));
});

