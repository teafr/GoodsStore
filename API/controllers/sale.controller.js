import Sale from '../models/sale.model.js';
import AppError from '../utils/AppError.js';

export async function getSales(req, res, next) {
    try {
        const sales = await Sale.get();
        res.status(200).json(sales);
    } catch (error) {
        next(error);
    }
}

export async function getSaleById(req, res, next) {
    try {
        const sale = await Sale.getById(req.params.id);
        if (!sale) {
            return next(new AppError('Sale not found', 404));
        }
        res.status(200).json(sale);
    } catch (error) {
        next(error);
    }
}

export async function createSale(req, res, next) {
    try {
        const sale = await Sale.createSale(req.body);
        res.status(201).json(sale);
    } catch (error) {
        next(new AppError(`Sale wasn't created. Message: ${error.message}`, 400));
    }
}

export async function updateSale(req, res, next) {
    try {
        const updatedSale = await Sale.updateById(req.params.id, req.body, { new: true, lean: true });
        if (!updatedSale) {
            return next(new AppError('Sale not found', 404));
        }
        res.status(200).json(updatedSale);
    } catch (error) {
        next(new AppError(`Sale wasn't updated. Message: ${error.message}`, 400));
    }
}

export async function deleteSale(req, res, next) {
    try {
        const deleted = await Sale.deleteById(req.params.id);
        if (!deleted) {
            return next(new AppError('Sale not found', 404));
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}