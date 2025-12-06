import express from 'express';
import { CustomerController } from '../controller/customer-controller';

export const customerRouter = express.Router();

customerRouter.post('/', CustomerController.create); 
customerRouter.get('/:customerId', CustomerController.get); 
customerRouter.put('/:customerId/name', CustomerController.updateName);
customerRouter.put('/:customerId/phone', CustomerController.updatePhoneNumber);
customerRouter.delete('/:customerId', CustomerController.remove);