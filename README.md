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


```ts
//server.ts file


import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 4001;

let server: Server | null = null;

process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('🛢️ Database connected successfully!');
  } catch (error) {
    console.error('😭 Failed to connect to the database', error);
    process.exit(1);
  }
};

const startServer = () => {
  server = app.listen(port, () => {
    console.log(
      `🏬 University management listening on port http://localhost:${port}`,
    );
  });
};

const handleServerShutdown = async () => {
  if (server) {
    server.close(async () => {
      console.log('Server closed gracefully.');
      await mongoose.connection.close();
      process.exit(0);
    });
  } else {
    await mongoose.connection.close();
    process.exit(0);
  }
};

const init = async () => {
  await connectToDatabase();
  startServer();
};

init();

process.on('SIGINT', () => {
  console.log('Received termination signal. Closing server gracefully...');
  handleServerShutdown();
});

process.on('SIGTERM', () => {
  console.log(
    'Received termination signal (SIGTERM). Closing server gracefully...',
  );
  handleServerShutdown();
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:');
  console.error(reason);
  console.error(promise);

  if (reason instanceof Error) {
    console.error('Error:', reason.message);
    console.error('Stack Trace:', reason.stack);
  }

  console.log('Unhandled Rejection Detected. Closing our server gracefully...');
  handleServerShutdown();
});


```


<p align='end'> powered by ___</p>
<p align='end'>mr-sazzad karim</p>
