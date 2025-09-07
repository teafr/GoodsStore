import { User } from "./user.model";

export interface Customer {
    user: User;
    address?: string;
    phone?: string;
    isLoyal: boolean;
}