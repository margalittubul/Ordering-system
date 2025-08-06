import express from 'express';

import {
  getAllProducts,
  createProduct
} from '../controller/productController.js';

import {authMiddleware , roleMiddleware } from '../authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllProducts);
router.post('/', authMiddleware, roleMiddleware('provider'), createProduct);

export default router;
