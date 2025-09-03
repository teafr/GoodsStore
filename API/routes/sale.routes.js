import { Router } from 'express';
import { getSales, getSaleById, createSale, updateSale, deleteSale } from '../controllers/sale.controller.js';

const router = Router();

router.get('/', getSales);
router.get('/:id', getSaleById);
router.post('/', createSale);
router.put('/:id', updateSale);
router.delete('/:id', deleteSale);

export default router;