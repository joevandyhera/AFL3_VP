import { prismaClient } from "../utils/database-utils";
import { ResponseError } from "../error/response-error";
import { Validation } from "../validations/validation";
import { CreateOrderRequest } from "../models/order-model";
import { CreateOrderValidation, OrderIdValidation } from "../validations/order-validation"; 
import { CustomerIdValidation } from "../validations/customer-validation";
import { RestaurantIdValidation } from "../validations/restaurant-validation";

export class OrderService {

    /**
     * logika yang saya pakai yaitu ada 10 menit per item dan 10 menit buat delivery
     * @param itemAmount 
     * @returns waktu asli dalam format time date
     */
    private static calculateETA(itemAmount: number): Date {
        const preparationTimeMinutes = itemAmount * 10; 
        const deliveryTimeMinutes = 10; 
        const totalMinutes = preparationTimeMinutes + deliveryTimeMinutes;
        
        const estimatedTime = new Date();
        estimatedTime.setMinutes(estimatedTime.getMinutes() + totalMinutes);
        
        return estimatedTime;
    }

    /**
     * new order req
     * @param request 
     */
    static async create(request: CreateOrderRequest): Promise<any> {
        const orderRequest = Validation.validate(CreateOrderValidation, request);

        const customer = await prismaClient.customer.count({ where: { id: orderRequest.customerId } });
        if (customer === 0) {
            throw new ResponseError(404, "Customer not found");
        }
        const restaurant = await prismaClient.restaurant.count({ where: { id: orderRequest.restaurantId } });
        if (restaurant === 0) {
            throw new ResponseError(404, "Restaurant not found");
        }

        const estimatedETA = this.calculateETA(orderRequest.itemAmount);

        const order = await prismaClient.orders.create({
            data: {
                customer_id: orderRequest.customerId,
                restaurant_id: orderRequest.restaurantId,
                item_amount: orderRequest.itemAmount,
                estimated_time: estimatedETA, 
                order_time: new Date() 
            }
        });

        return order;
    }

    /**
     * 2. display order ( all order )
     */
    static async getAll(): Promise<any> {
        return prismaClient.orders.findMany({
            include: {
                customer: { select: { name: true, phone_number: true } },
                restaurant: { select: { name: true } }
            },
            orderBy: { order_time: 'desc' }
        });
    }

    /**
     * display based on what customer ordered
     * @param customerId ID Pelanggan
     */
    static async getByCustomer(customerId: number): Promise<any> {
        const id = Validation.validate(CustomerIdValidation, customerId);

        const orders = await prismaClient.orders.findMany({
            where: { customer_id: id },
            include: {
                customer: { select: { name: true } },
                restaurant: { select: { name: true } }
            },
            orderBy: { order_time: 'desc' }
        });

        if (orders.length === 0) {
             throw new ResponseError(404, "No orders found for this customer");
        }
        
        return orders;
    }

    /**
     * display based on restaurant thats ordered from
     * @param restaurantId ID Restoran
     */
    static async getByRestaurant(restaurantId: number): Promise<any> {
        const id = Validation.validate(RestaurantIdValidation, restaurantId);

        const orders = await prismaClient.orders.findMany({
            where: { restaurant_id: id },
            include: {
                customer: { select: { name: true } },
                restaurant: { select: { name: true } }
            },
            orderBy: { order_time: 'desc' }
        });
        
        if (orders.length === 0) {
             throw new ResponseError(404, "No orders found from this restaurant");
        }

        return orders;
    }
    
    /**
     * display jam saat kita pesan
     * display eta
     * @param orderId ID Pesanan
     */
    static async getOrderTimes(orderId: number): Promise<any> {
        const id = Validation.validate(OrderIdValidation, orderId);

        const order = await prismaClient.orders.findUnique({
            where: { id: id },
            select: {
                order_time: true,
                estimated_time: true,
                item_amount: true,
                customer: { select: { name: true } }
            }
        });

        if (!order) {
            throw new ResponseError(404, "Order not found");
        }

        return {
            customer: order.customer.name,
            itemAmount: order.item_amount,
            orderTime: order.order_time, 
            estimatedETA: order.estimated_time 
        };
    }
}