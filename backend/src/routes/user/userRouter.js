import { Router } from 'express';
import UserController from '../../controllers/UserController.js';
import { validationMiddleware } from '../../middlewares/validationMiddleware.js';
import { createUserValidationSchema } from '../../validationSchemas/validationSchemas.js';

const userRouter = Router();

userRouter.post('/signup', validationMiddleware(createUserValidationSchema), UserController.registration);

export default userRouter;
