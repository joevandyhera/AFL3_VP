
import { z } from "zod";
import { CreateOrderRequest } from "../models/order-model";

export const CreateOrderValidation = z.object({
    customerId: z.number().int().positive("Customer ID must be a positive integer"),
    restaurantId: z.number().int().positive("Restaurant ID must be a positive integer"),
    itemAmount: z.number().int().min(1, "Item amount must be at least 1"), 
});

export const OrderIdValidation = z.number().int().positive("Order ID must be a positive integer");