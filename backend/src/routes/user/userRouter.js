import { Router } from 'express';
import UserController from '../../controllers/UserController.js';

const userRouter = Router();

userRouter.post('/signup', UserController.registration);

export default userRouter;
