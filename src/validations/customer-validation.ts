import { z } from "zod";
import { 
    CreateCustomerRequest, 
    UpdateCustomerNameRequest, 
    UpdateCustomerPhoneNumberRequest 
} from "../models/customer-model";

export const CreateCustomerValidation = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name cannot be more than 100 characters"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number cannot exceed 15 digits"), 
});

export const UpdateCustomerNameValidation = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name cannot be more than 100 characters"),
});

export const UpdateCustomerPhoneNumberValidation = z.object({
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number cannot exceed 15 digits"),
});

export const CustomerIdValidation = z.number().int().positive("Customer ID must be a positive integer");