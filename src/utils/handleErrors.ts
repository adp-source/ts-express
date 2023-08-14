import { Request, Response, NextFunction, RequestHandler } from 'express';

function handleErrors(handler: RequestHandler): RequestHandler {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      return handler(req, res, next);
    } catch (error) {
      const { message = 'Unexpected error', code = 500, stack } = error;
      console.log({
        message,
        code,
        stack,
        module: handler.name,
      });

      return res.status(code).json({
        message,
        code
      });
    }
  }
}

export {
  handleErrors
}