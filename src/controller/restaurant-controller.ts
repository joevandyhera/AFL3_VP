import { Request, Response, NextFunction } from "express";
import { RestaurantService } from "../service/restaurant-service"; 
import { ResponseError } from "../error/response-error";

export class RestaurantController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await RestaurantService.create(req.body);

            res.status(201).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const statusQuery = req.query.isOpen as string;
            let isOpen: boolean | null = null;

            if (statusQuery !== undefined) {
                if (statusQuery === 'true') {
                    isOpen = true;
                } else if (statusQuery === 'false') {
                    isOpen = false;
                } else {
                    throw new ResponseError(400, "Query parameter 'isOpen' must be 'true' or 'false'");
                }
            }

            const result = await RestaurantService.getAll(isOpen);

            res.status(200).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = parseInt(req.params.restaurantId);

            if (isNaN(restaurantId)) {
                 throw new ResponseError(400, "Restaurant ID must be a valid number");
            }
            
            const result = await RestaurantService.getById(restaurantId);

            res.status(200).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }

    static async updateName(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = parseInt(req.params.restaurantId);
            const name = req.body.name as string; 
            
            if (isNaN(restaurantId)) {
                 throw new ResponseError(400, "Restaurant ID must be a valid number");
            }

            const result = await RestaurantService.updateName(restaurantId, name);

            res.status(200).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }
    
    static async updateDescription(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = parseInt(req.params.restaurantId);
            
            if (isNaN(restaurantId)) {
                 throw new ResponseError(400, "Restaurant ID must be a valid number");
            }

            const result = await RestaurantService.updateDescription(restaurantId, req.body);

            res.status(200).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }
    

    static async updateStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = parseInt(req.params.restaurantId);
            
            if (isNaN(restaurantId)) {
                 throw new ResponseError(400, "Restaurant ID must be a valid number");
            }

            const result = await RestaurantService.updateStatus(restaurantId, req.body);

            res.status(200).json({
                data: result
            });
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = parseInt(req.params.restaurantId);

            if (isNaN(restaurantId)) {
                 throw new ResponseError(400, "Restaurant ID must be a valid number");
            }

            await RestaurantService.remove(restaurantId);

            res.status(200).json({
                data: "OK"
            });
        } catch (e) {
            next(e);
        }
    }
}