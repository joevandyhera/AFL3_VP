import { prismaClient } from "../utils/database-utils";
import { ResponseError } from "../error/response-error";
import { Validation } from "../validations/validation"; 
import { 
    CreateCustomerRequest, 
    UpdateCustomerNameRequest, 
    UpdateCustomerPhoneNumberRequest 
} from "../models/customer-model"; 
import { 
    CreateCustomerValidation, 
    UpdateCustomerNameValidation, 
    UpdateCustomerPhoneNumberValidation,
    CustomerIdValidation
} from "../validations/customer-validation"; 

export class CustomerService {

    /**
     * @param request data pelanggan baru
     */
    static async create(request: CreateCustomerRequest): Promise<any> {
        
        const customerRequest = Validation.validate(CreateCustomerValidation, request);

        const count = await prismaClient.customer.count({
            where: {
                phone_number: customerRequest.phoneNumber
            }
        });

        if (count > 0) {
            throw new ResponseError(400, "Phone number already used");
        }

        const customer = await prismaClient.customer.create({
            data: {
                name: customerRequest.name,
                phone_number: customerRequest.phoneNumber
            }
        });

        return customer;
    }

    /**
     * @param id ID pelanggan
     */
    static async get(id: number): Promise<any> {
        const customerId = Validation.validate(CustomerIdValidation, id);

        const customer = await prismaClient.customer.findUnique({
            where: {
                id: customerId
            }
        });

        //error handling
        if (!customer) {
            throw new ResponseError(404, "Customer not found");
        }

        return customer;
    }

    /**
     * @param id ID pelanggan
     * @param request data update (hanya nama)
     */
    static async updateName(id: number, request: UpdateCustomerNameRequest): Promise<any> {
        const customerId = Validation.validate(CustomerIdValidation, id);
        const updateRequest = Validation.validate(UpdateCustomerNameValidation, request);

        const customer = await prismaClient.customer.count({ where: { id: customerId } });
        if (customer === 0) {
            throw new ResponseError(404, "Customer not found");
        }

        return prismaClient.customer.update({
            where: { id: customerId },
            data: { name: updateRequest.name }
        });
    }
    
    /**
     * @param id ID pelanggan
     * @param request data update (hanya nomor telepon)
     */
    static async updatePhoneNumber(id: number, request: UpdateCustomerPhoneNumberRequest): Promise<any> {
        const customerId = Validation.validate(CustomerIdValidation, id);
        const updateRequest = Validation.validate(UpdateCustomerPhoneNumberValidation, request);

        //error handling cust
        const customer = await prismaClient.customer.count({ where: { id: customerId } });
        if (customer === 0) {
            throw new ResponseError(404, "Customer not found");
        }

        //error handling phone number
        const phoneCount = await prismaClient.customer.count({
            where: {
                phone_number: updateRequest.phoneNumber,
                NOT: { id: customerId } //exc us self
            }
        });
        if (phoneCount > 0) {
            throw new ResponseError(400, "New phone number is already in use");
        }
        return prismaClient.customer.update({
            where: { id: customerId },
            data: { phone_number: updateRequest.phoneNumber }
        });
    }

    /**
     * @param id ID pelanggan
     */
    static async remove(id: number): Promise<void> {
        const customerId = Validation.validate(CustomerIdValidation, id);

        //cek cust ada / tidak
        const customer = await prismaClient.customer.count({ where: { id: customerId } });
        if (customer === 0) {
            throw new ResponseError(404, "Customer not found");
        }

        await prismaClient.customer.delete({
            where: { id: customerId }
        });
    }
}