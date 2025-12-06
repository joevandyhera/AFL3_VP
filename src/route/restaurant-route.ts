import express from 'express';
import { RestaurantController } from '../controller/restaurant-controller';

export const restaurantRouter = express.Router();

restaurantRouter.post('/', RestaurantController.create);
restaurantRouter.get('/', RestaurantController.getAll);
restaurantRouter.get('/:restaurantId', RestaurantController.getById);
restaurantRouter.put('/:restaurantId/name', RestaurantController.updateName);
restaurantRouter.put('/:restaurantId/description', RestaurantController.updateDescription);
restaurantRouter.put('/:restaurantId/status', RestaurantController.updateStatus);
restaurantRouter.delete('/:restaurantId', RestaurantController.remove);