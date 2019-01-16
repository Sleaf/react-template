import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setTagTitle, removeElement, removeClass } from '@/utils/domLib';
import { setConfig } from 'react-hot-loader'
import '@/styles/index.less';
import ready from '@/ready';

// //why-did-you-update
// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

//hot-reload
setConfig({
  ignoreSFC: true, // RHL will be __completely__ disabled for SFC
  pureRender: true, // RHL will not change render method
});

//page onLoaded
ready().then(_ => {
  // 移除 loading 效果
  removeClass(document.getElementById('body'), 'body-loading');
  removeElement(document.getElementById('loading'));
  setTagTitle('react-template');
  //mount react-dom
  ReactDOM.render(<App />, document.getElementById('root'));
});

