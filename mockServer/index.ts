import { resolve } from 'path';
import express from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import WebpackDevServer = require('webpack-dev-server');

enum HttpStatus {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  MovedPermanently = 301,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  Conflict = 409,
  Gone = 410,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

/*
 * 参考使用 Express.js 的文档： http://expressjs.com/zh-cn/4x/api.html
 * 这部分将会拦截 Proxy 操作，故不必修改 Proxy 设置。
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