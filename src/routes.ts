import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

const router = Router();

import cors from 'cors';

router.use(cors());

router
  .post('/users', UserController.store)
  .post('/auth', AuthController.loginAuthenticate)
  .get('/users', authMiddleware,UserController.index)
  .get('/email/:token', AuthController.emailAuthenticate)

export default router;
