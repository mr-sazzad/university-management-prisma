import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response, urlencoded } from 'express';
import applicationRoutes from '../src/routes/index';
import globalErrorHandler from './middlewares/global_error_handler';

const app: Application = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: true,
    status_code: 200,
    creator: {
      first_name: 'sazzad',
      last_name: 'karim',
      age: 22,
      home: 'Gopalganj',
    },
    message: `👋 Welcome to University management backend_with_postgreSQL`,

    end_points: {
      host: 'http://localhost:4001',
    },
  });
});

app.use('/api/v1', applicationRoutes);

app.use(globalErrorHandler);

export default app;
