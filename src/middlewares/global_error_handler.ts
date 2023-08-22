import { ErrorRequestHandler } from 'express';
import apiError from '../errors/api_error';
import { handleValidationError } from '../errors/handle_validation_error';
import { IErrorMessages } from '../types';

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  let statusCode = 500;
  let message = err;
  let errorMessages: IErrorMessages[] = [];

  if (err?.name === 'ValidationError') {
    const simple = handleValidationError(err);

    statusCode = simple.statusCode;
    message = simple.message;
    errorMessages = simple.errorMessages;
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = err?.message
      ? [
          {
            path: 'N/A',
            message: err.message,
          },
        ]
      : [];
  } else if (err instanceof apiError) {
    (statusCode = err?.statusCode),
      (message = err?.message),
      (errorMessages = err?.message
        ? [
            {
              path: 'N/A',
              message: err.message,
            },
          ]
        : []);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: process.env.NODE_ENV === 'development' ? err?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
