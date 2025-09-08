import { Product } from "./product.model";

export interface Sale {
    product: Product;
    user: number;
    quantity: number;
    deliveryDate?: Date;
    purchaseDate: Date;
}