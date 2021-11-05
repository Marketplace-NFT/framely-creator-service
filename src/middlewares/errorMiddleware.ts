import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@exceptions/errors';

function errorMiddleware(
  error: HttpError | Error | null,
  _req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  if (!error) return next();
  if (!(error instanceof HttpError)) {
    error = new HttpError(error.message || 'Something went wrong', 500);
  }
  const err = error as HttpError;
  const data = { code: err.code, message: err.message };
  return res.status(err.status).send(data);
}

export default errorMiddleware;
