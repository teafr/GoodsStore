import Customer from '../models/customer.model.js';
import AppError from '../utils/AppError.js';

export async function getCustomers(req, res, next) {
    try {
        res.json(await Customer.get());
    } catch (error) {
        next(error);
    }
}

export async function getCustomerById(req, res, next) {
    try {
        const customer = await Customer.getById(req.params.id);
        if (!customer) {
            return next(new AppError('Customer not found', 404));
        }
        res.json(customer);
    } catch (error) {
        next(error);
    }
}

export async function getCustomerSales(req, res, next) {
    try {
        console.log(req.params.id);
        // const customer = await Customer.getSales(req.params.id);
        const sales = await Customer.getSales(req.params.id);
        if (!sales) {
            return next(new AppError('Customer not found', 404));
        }
        res.json(sales);
    } catch (error) {
        next(error);
    }
}

export async function createCustomer(req, res, next) {
    try {
        const newCustomer = await Customer.create(req.body);
        res.status(201).json(newCustomer);
    } catch (error) {
        next(new AppError(`Customer wasn't created. Message: ${error.message}`, 400));
    }
}

export async function updateCustomerById(req, res, next) {
    try {
        const updatedCustomer = await Customer.updateById(req.params.id, req.body, { new: true });
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(updatedCustomer);
    } catch (error) {
        next(new AppError(`Customer wasn't updated. Message: ${error.message}`, 400));
    }
}

export async function deleteCustomerById(req, res, next) {
    try {
        const deleted = await Customer.deleteById(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        next(error);
    }
}