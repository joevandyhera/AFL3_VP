import express from 'express';
import { customerRouter } from './customer-route'; 
import { restaurantRouter } from './restaurant-route';
import { orderRouter } from './order-route';

export const apiRouter = express.Router();
apiRouter.use('/customers', customerRouter); 
apiRouter.use('/restaurants', restaurantRouter);
apiRouter.use('/orders', orderRouter);