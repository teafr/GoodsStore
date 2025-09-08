import Product from '../models/product.model.js';
import AppError from '../utils/AppError.js';

export async function getFilteredProducts(req, res, next) {
    try {
        const products = await Product.getFiltered(req.query);
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

export async function getProductById(req, res, next) {
    try {
        const product = await Product.getById(req.params.id);
        if (!product) {
            return next(new AppError('Product not found', 404));
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

export async function createProduct(req, res, next) {
    try {
        const product = new Product(req.body);
        await product.save();

        res.status(201).json(product);
    } catch (error) {
        return next(new AppError(`Product wasn't created. Message: ${error.message}`, 400));
    }
}

export async function updateProductById(req, res, next) {
    try {
        const product = await Product.updateById(req.params.id, req.body, { new: true, runValidators: true });        
        if (!product) {
            return next(new AppError('Product not found', 404));
        }

        res.status(204).json(product);
    } catch (error) {
        return next(new AppError(`Product wasn't updated. Message: ${error.message}`, 400));
    }
}

export async function deleteProductById(req, res, next) {
    try {
        const product = await Product.deleteById(req.params.id);
        if (!product) {
            return next(new AppError('Product not found', 404));
        }

        res.status(204).json({ message: 'Product deleted' });
    } catch (err) {
        next(err);
    }
}
