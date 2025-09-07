import express from 'express';
import { getCustomers, getCustomerById, createCustomer, getCustomerSales, updateCustomerById, deleteCustomerById } from '../controllers/customer.controller.js';

const router = express.Router();

router.route('/').get(getCustomers).post(createCustomer);
router.route('/:id').get(getCustomerById).put(updateCustomerById).delete(deleteCustomerById);
router.route('/:id/sales').get(getCustomerSales);

export default router;