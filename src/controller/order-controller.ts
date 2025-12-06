import { Request, Response, NextFunction } from "express";
import { OrderService } from "../service/order-service"; 
import { ResponseError } from "../error/response-error";

export class OrderController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await OrderService.create(req.body);

            res.status(201).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await OrderService.getAll();

            res.status(200).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }

    static async getByCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = parseInt(req.params.customerId);

            if (isNaN(customerId)) {
                 throw new ResponseError(400, "Customer ID must be a valid number");
            }

            const result = await OrderService.getByCustomer(customerId);

            res.status(200).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }
    
    static async getByRestaurant(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = parseInt(req.params.restaurantId);

            if (isNaN(restaurantId)) {
                 throw new ResponseError(400, "Restaurant ID must be a valid number");
            }

            const result = await OrderService.getByRestaurant(restaurantId);

            res.status(200).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }
    
    static async getOrderTimes(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = parseInt(req.params.orderId);

            if (isNaN(orderId)) {
                 throw new ResponseError(400, "Order ID must be a valid number");
            }

            const result = await OrderService.getOrderTimes(orderId);

            res.status(200).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }
}