import { Router } from 'express';
import { register, login, refreshTokens } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshTokens);

export default router;