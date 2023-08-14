import Ajv from 'ajv';
import _schema from '../../_schema';
import { Request, Response, NextFunction } from 'express';

const ajv = new Ajv();

// validation middleware
export function validateBody(schema: object) {
  const validate = ajv.compile(schema);
  
  return (req: Request, res: Response, next: NextFunction) => {
    if (!validate(req.body)) {
      return res.status(400).json(validate.errors);
    }
    return next();
  };
}

export const validateUserBody = validateBody(_schema.User);
