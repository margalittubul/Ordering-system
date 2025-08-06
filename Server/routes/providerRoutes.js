import express from 'express';

import {
  getAllProviders,
  createProvider,
  addProductToProvider,
  getProviderProducts,
  getProviderDetails,
  getProviderProductsById
} from '../controller/providerController.js';

import {authMiddleware , roleMiddleware } from '../authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware('admin'), getAllProviders);
router.post('/', createProvider);
router.post('/add-product',authMiddleware,roleMiddleware('provider'), addProductToProvider);
router.get('/my-product',authMiddleware,roleMiddleware('provider'), getProviderProducts);
router.get('/getProviderDetails', authMiddleware,roleMiddleware('provider'),getProviderDetails);
router.get('/:providerId', authMiddleware,roleMiddleware('admin'), getProviderProductsById);

export default router;
