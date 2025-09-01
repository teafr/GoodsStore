import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

import errorMiddleware from './middlewares/error.middleware.js';

app.use(cors());
app.use(json()); 
app.use(morgan('dev'));

app.use(errorMiddleware);

export default app;