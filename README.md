### 👋 Hi there

### welcome to this page 🌹

<h2 align='center'>university-management-prisma</h2>



```ts
// Validation Error Handler 🧩

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

```


```ts
// create API error that extends Error class 🧩

class apiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message);

    this.statusCode = statusCode;

    if (this.stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default apiError;

```



<p align='end'> powered by ___</p>
<p align='end'>mr-sazzad karim</p>
