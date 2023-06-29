import { NextFunction, Request, RequestHandler, Response } from 'express';

export type AsyncMiddleware = (req: Request, res: Response, next: NextFunction) => any;

const catchAsync = (func: AsyncMiddleware) => {
  return function (req: Request, res: Response, next: NextFunction) {
    func(req, res, next).catch((err: Error) => {
      console.log('Inner Func in CatchAsync');
      next(err);
    });
  };
};

export default catchAsync;
