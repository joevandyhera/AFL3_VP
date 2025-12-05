import { z } from "zod";
import { 
    CreateRestaurantRequest, 
    UpdateRestaurantStatusRequest,
    UpdateRestaurantDescriptionRequest
} from "../models/restaurant-model";

export const CreateRestaurantValidation = z.object({
    name: z.string().min(1, "Restaurant name is required").max(100, "Name cannot be more than 100 characters"),
    description: z.string().min(1, "Description is required").max(255, "Description cannot be more than 255 characters"),
});

export const UpdateRestaurantStatusValidation = z.object({
    isOpen: z.boolean("Status must be true or false"),
});

export const UpdateRestaurantDescriptionValidation = z.object({
    description: z.string().min(1, "Description is required").max(255, "Description cannot be more than 255 characters"),
});

export const RestaurantIdValidation = z.number().int().positive("Restaurant ID must be a positive integer");