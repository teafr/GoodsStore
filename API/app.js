import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import productRoutes from './routes/product.routes.js';
import customerRoutes from './routes/customer.routes.js';
import saleRoutes from './routes/sale.routes.js';

const app = express();

import errorMiddleware from './middlewares/error.middleware.js';

app.use(cors());
app.use(json()); 
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('API is running'));
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/sales', saleRoutes);

app.use(errorMiddleware);

export default app;