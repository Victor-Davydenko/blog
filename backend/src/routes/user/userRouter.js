import { Router } from 'express';
import UserController from '../../controllers/UserController.js';
import { validationMiddleware } from '../../middlewares/validationMiddleware.js';
import { createUserValidationSchema, loginUserValidationSchema } from '../../validationSchemas/validationSchemas.js';

const userRouter = Router();

userRouter.post('/signup', validationMiddleware(createUserValidationSchema), UserController.registration);
userRouter.post('/login', validationMiddleware(loginUserValidationSchema), UserController.login);
userRouter.get('/api/refresh', UserController.refreshToken);

export default userRouter;
