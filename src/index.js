import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setTagTitle, removeElement, removeClass } from '@/utils/domLib';
import { setConfig } from 'react-hot-loader'
import '@/styles/index.less';
import ready from '@/ready';
import pkg from '../package';

//debug
if (process.env.NODE_ENV === 'development') {
  // // why-did-you-update
  // const { whyDidYouUpdate } = require('why-did-you-update');
  // whyDidYouUpdate(React);
}

//hot-reload
setConfig({
  ignoreSFC: !!ReactDOM.setHotElementComparator, // RHL will be __completely__ disabled for SFC
  pureSFC: true,
  pureRender: true, // RHL will not change render method
});

//page onLoaded
ready().then(_ => {
  // 移除 loading 效果
  removeClass(document.getElementById('body'), 'body-loading');
  removeElement(document.getElementById('loading'));
  setTagTitle(pkg.name);//fixme replace to your website name
  //mount react-dom
  ReactDOM.render(<App />, document.getElementById('root'));
});

