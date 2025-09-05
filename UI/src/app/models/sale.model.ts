import { Customer } from "./customer.model";
import { Product } from "./product.model";

export interface Sale {
    id: number;
    product: Product;
    customerId: Customer;
    quantity: number;
    date: Date;
}