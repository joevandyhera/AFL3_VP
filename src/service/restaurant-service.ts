import { prismaClient } from "../utils/database-utils";
import { z } from "zod";
import { ResponseError } from "../error/response-error";
import { Validation } from "../validations/validation"; // Pastikan path folder 'validation' benar
import { 
    CreateRestaurantRequest, 
    UpdateRestaurantStatusRequest, 
    UpdateRestaurantDescriptionRequest 
} from "../models/restaurant-model"; // Pastikan path folder 'model' benar
import { 
    CreateRestaurantValidation, 
    UpdateRestaurantStatusValidation, 
    UpdateRestaurantDescriptionValidation, 
    RestaurantIdValidation 
} from "../validations/restaurant-validation"; // Pastikan path folder 'validation' benar

export class RestaurantService {

    /**
     * create restaurant
     * @param request data request
     */
    static async create(request: CreateRestaurantRequest): Promise<any> {
        const restaurantRequest = Validation.validate(CreateRestaurantValidation, request);

        const restaurant = await prismaClient.restaurant.create({
            data: restaurantRequest
        });

        return restaurant;
    }

    /**
     * @param isOpen filter awal status
     */
    static async getAll(isOpen: boolean | null): Promise<any[]> {
        let whereCondition = {};

        if (isOpen !== null) {
            whereCondition = { isOpen: isOpen };
        }
        
        const restaurants = await prismaClient.restaurant.findMany({
            where: whereCondition,
            select: { 
                id: true,
                name: true,
                description: true,
                isOpen: true
            }
        });

        return restaurants;
    }

    /**
     * @param id ID restoran
     */
    static async getById(id: number): Promise<any> {
        //validate id
        const restaurantId = Validation.validate(RestaurantIdValidation, id);

        const restaurant = await prismaClient.restaurant.findUnique({
            where: { id: restaurantId }
        });

        if (!restaurant) {
            throw new ResponseError(404, "Restaurant not found");
        }

        return restaurant;
    }

    /**
     * @param id ID restoran
     * @param name nama baru
     */
    static async updateName(id: number, name: string): Promise<any> {
        const restaurantId = Validation.validate(RestaurantIdValidation, id);
        Validation.validate(z.string().min(1).max(100), name); 

        const count = await prismaClient.restaurant.count({ where: { id: restaurantId } });
        if (count === 0) {
            throw new ResponseError(404, "Restaurant not found");
        }

        return prismaClient.restaurant.update({
            where: { id: restaurantId },
            data: { name: name }
        });
    }

    /**
     * @param id ID restoran
     * @param request data update ( desc )
     */
    static async updateDescription(id: number, request: UpdateRestaurantDescriptionRequest): Promise<any> {
        const restaurantId = Validation.validate(RestaurantIdValidation, id);
        const updateRequest = Validation.validate(UpdateRestaurantDescriptionValidation, request);

        const count = await prismaClient.restaurant.count({ where: { id: restaurantId } });
        if (count === 0) {
            throw new ResponseError(404, "Restaurant not found");
        }

        return prismaClient.restaurant.update({
            where: { id: restaurantId },
            data: { description: updateRequest.description }
        });
    }

    /**
     * @param id ID restoran
     * @param request data update ( status )
     */
    static async updateStatus(id: number, request: UpdateRestaurantStatusRequest): Promise<any> {
        const restaurantId = Validation.validate(RestaurantIdValidation, id);
        const updateRequest = Validation.validate(UpdateRestaurantStatusValidation, request);

        const count = await prismaClient.restaurant.count({ where: { id: restaurantId } });
        if (count === 0) {
            throw new ResponseError(404, "Restaurant not found");
        }

        return prismaClient.restaurant.update({
            where: { id: restaurantId },
            data: { isOpen: updateRequest.isOpen }
        });
    }

    /**
     * @param id ID restoran
     */
    static async remove(id: number): Promise<void> {
        const restaurantId = Validation.validate(RestaurantIdValidation, id);

        const count = await prismaClient.restaurant.count({ where: { id: restaurantId } });
        if (count === 0) {
            throw new ResponseError(404, "Restaurant not found");
        }

        await prismaClient.restaurant.delete({
            where: { id: restaurantId }
        });
    }
}