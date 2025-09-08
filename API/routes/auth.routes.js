import { Router } from 'express';
import { getUser, register, login, refreshTokens, logout, updateUser, markUser } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.get('', authMiddleware, getUser);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout)
router.post('/refresh', refreshTokens);
router.put('', authMiddleware, updateUser);
router.put('/mark/:id', authMiddleware, markUser)

export default router;