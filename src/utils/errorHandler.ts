import { Request, Response, NextFunction } from 'express';
import { ValidateError } from "tsoa";

export interface ValidateErrorResponse {
  message: "Validation failed";
  details: { [name: string]: unknown };
}

export interface GenericErrorResponse {
  message: string,
  details?: object
}

export type ApiError = ValidateErrorResponse | GenericErrorResponse;

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof ValidateError) {
    const error = {
      message: "Validation Failed",
      details: err?.fields,
    };
    console.log(error);
    return res.status(400).json(error);
  }
  const { message = 'Unexpected error', stack } = err;
  console.log({
    message,
    stack,
    url: req.url
  });
  
  return res.status(500).json({
    message,
  });
}
