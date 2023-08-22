import mongoose from 'mongoose';

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errors = Object.values(err.errors).map(item => {
    const validationError = item as mongoose.Error.ValidatorError;
    return {
      path: validationError?.path,
      message: validationError?.message,
    };
  });
  const statusCode = 422;
  return {
    statusCode,
    message: err?.message,
    errorMessages: errors,
  };
};
