import { Request, Response, NextFunction } from "express";
import { CustomerService } from "../service/customer-service"; 
import { ResponseError } from "../error/response-error";

export class CustomerController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await CustomerService.create(req.body);

            res.status(201).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = parseInt(req.params.customerId);

            if (isNaN(customerId)) {
                 throw new ResponseError(400, "Customer ID must be a valid number");
            }
            
            const result = await CustomerService.get(customerId);

            res.status(200).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }

    static async updateName(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = parseInt(req.params.customerId);

            if (isNaN(customerId)) {
                 throw new ResponseError(400, "Customer ID must be a valid number");
            }

            const result = await CustomerService.updateName(customerId, req.body);

            res.status(200).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }
    
    static async updatePhoneNumber(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = parseInt(req.params.customerId);
            
            if (isNaN(customerId)) {
                 throw new ResponseError(400, "Customer ID must be a valid number");
            }

            const result = await CustomerService.updatePhoneNumber(customerId, req.body);

            res.status(200).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const customerId = parseInt(req.params.customerId);

            if (isNaN(customerId)) {
                 throw new ResponseError(400, "Customer ID must be a valid number");
            }

            await CustomerService.remove(customerId);

            res.status(200).json({
                data: "OK"
            });
        } catch (e) {
            next(e);
        }
    }
}