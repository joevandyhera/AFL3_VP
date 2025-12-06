import express from 'express';
import { OrderController } from '../controller/order-controller';

export const orderRouter = express.Router();

orderRouter.post('/', OrderController.create);
orderRouter.get('/', OrderController.getAll);
orderRouter.get('/customer/:customerId', OrderController.getByCustomer);
orderRouter.get('/restaurant/:restaurantId', OrderController.getByRestaurant);
orderRouter.get('/:orderId/times', OrderController.getOrderTimes);