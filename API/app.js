import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import productRoutes from './routes/product.routes.js';
import saleRoutes from './routes/sale.routes.js';
import authRoutes from './routes/auth.routes.js';

import errorMiddleware from './middlewares/error.middleware.js';
import authMiddleware from './middlewares/auth.middleware.js';

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));
app.use(json()); 
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.use(authMiddleware);

app.use('/sales', saleRoutes);


app.use(errorMiddleware);

export default app;