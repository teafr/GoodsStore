export interface Customer {
    id: number;
    lastName: string;
    firstName: string;
    patronymic?: string;
    address?: string;
    phone?: string;
    email: string;
    isLoyal: boolean;
}