import express from 'express';

import { login, register } from '../controller/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
