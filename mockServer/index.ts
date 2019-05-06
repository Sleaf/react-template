import { resolve } from 'path';
import express from 'express';
import WebpackDevServer = require("webpack-dev-server");
import { NextFunction, Request, Response } from "express-serve-static-core";

/*
 * 参考使用 Express.js 的文档： http://expressjs.com/zh-cn/4x/api.html
 * 这部分会在 Proxy 操作之前，可不修改 Proxy 设置。
 * */
export default (app: express.Application, server: WebpackDevServer) => {
  // Example
  app.get('/api', (req: Request, res: Response, next: NextFunction) => {
    res.send('You enabled mock service!');
  });
  app.get('/mock', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(resolve(__dirname, 'mockData/hello.json'));
  });
};