import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';

import userRoute from './routes/userRoute.js';
import { register } from './controller/authController.js';

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

//setting the file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/assets');
  },
});

const upload = multer({ storage });

app.post('/api/auth/register', upload.single('picture'), register);

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
