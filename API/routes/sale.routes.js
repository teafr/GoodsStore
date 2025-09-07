import { Router } from 'express';
import { getSales, getSaleById, createSale, createMultipleSales, updateSale, deleteSale } from '../controllers/sale.controller.js';

const router = Router();

router.route('/').get(getSales).post(createSale);
router.route('/:id').get(getSaleById).put(updateSale).delete(deleteSale);
router.route('/many').post(createMultipleSales);

export default router;