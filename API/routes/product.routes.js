import { Router } from 'express';
import { getFilteredProducts, getProductById, createProduct, updateProductById, deleteProductById } from '../controllers/product.controller.js';

const router = Router();

router.get('/', getFilteredProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

export default router;