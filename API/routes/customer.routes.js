import express from 'express';
import { getCustomers, getCustomerById, createCustomer, getCustomerSales, updateCustomerById, deleteCustomerById } from '../controllers/customer.controller.js';

const router = express.Router();

router.get('/', getCustomers);
router.get('/:id', getCustomerById);
router.get('/:id/sales', getCustomerSales);
router.post('/', createCustomer);
router.put('/:id', updateCustomerById);
router.delete('/:id', deleteCustomerById);

export default router;