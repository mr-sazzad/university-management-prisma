import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT;

const connectingString = () => {
  try {
    mongoose.connect(process.env.DATABASE_URL as string);
    console.log('🛢️ database connected successfully !');

    app.listen(port, () => {
      console.log(
        `🏬 University management listening on port http://localhost:${port}`,
      );
    });

    app.listen();
  } catch (error: any) {
    console.log('😭 Failed to connect database', error);
  }
};

connectingString();
