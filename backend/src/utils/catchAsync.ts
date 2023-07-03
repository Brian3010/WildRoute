import { NextFunction, Request, RequestHandler, Response } from 'express';

export type AsyncMiddleware<T, U, N> = (req: T, res: U, next: N) => any;

// this function wraps an async function - higher order function
// return a function with attached catch(err)
const catchAsync = (func: Function) => {
  return function (req: Request, res: Response, next: NextFunction) {
    func(req, res, next).catch((err: Error) => {
      console.log('Inner Func in CatchAsync');
      next(err);
    });
  };
};

export default catchAsync;
