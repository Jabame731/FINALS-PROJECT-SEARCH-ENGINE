import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoute from './routes/userRoute.js';

const app = express();

dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());

//connect to mongoDB database
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // method to connect to the database
    console.log('connected to MONGO DB');
  } catch (err) {
    console.log(err);
  }
};

//routers
app.use('/api/auth', userRoute);

mongoose.set('strictQuery', true);

//if theres an error to connection to mongo display it
mongoose.connection.on('error', (err) => {
  console.log(err);
});

const port = process.env.port;

app.listen(port, () => {
  connectToDB();
  console.log(`connected to Port ${port}`);
});
