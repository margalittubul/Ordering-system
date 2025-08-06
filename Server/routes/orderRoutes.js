
import express from 'express';
import {
  getAllOrders,
  createOrder,
  updateOrder
} from '../controller/orderController.js';

import {authMiddleware , roleMiddleware } from '../authMiddleware.js';

const router = express.Router();

router.get('/',authMiddleware, getAllOrders);
router.post('/',authMiddleware,roleMiddleware('admin'), createOrder);
router.put('/:id',authMiddleware, updateOrder);

export default router;
