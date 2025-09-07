import { Router } from 'express';
import { getFilteredProducts, getProductById, createProduct, updateProductById, deleteProductById } from '../controllers/product.controller.js';

const router = Router();

router.route('/').get(getFilteredProducts).post(createProduct);
router.route('/:id').get(getProductById).put(updateProductById).delete(deleteProductById);

export default router;