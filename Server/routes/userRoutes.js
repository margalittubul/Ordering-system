import express from 'express';
import { getAllUsers, createUser, login ,getUserFromToken} from '../controller/userController.js';

import { authMiddleware, roleMiddleware } from '../authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware('admin'), getAllUsers);
router.post('/', authMiddleware, roleMiddleware('admin'), createUser);
router.post('/login', login); 
router.get('/getUserFromToken',authMiddleware,getUserFromToken);

export default router;
