import { Router } from 'express';
import UserController from '../../controllers/UserController.js';
import { validationMiddleware } from '../../middlewares/validationMiddleware.js';
import {
  createUserValidationSchema,
  loginUserValidationSchema,
  updatePasswordValidationSchema,
} from '../../validationSchemas/validationSchemas.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import { uploadMedia } from '../../middlewares/uploadMediaMiddleware.js';
import { imageFileFilter } from '../../utils/fileFilters.js';

const userRouter = Router();

userRouter.post('/signup', validationMiddleware(createUserValidationSchema), UserController.registration);
userRouter.post('/login', validationMiddleware(loginUserValidationSchema), UserController.login);
userRouter.get('/api/refresh', authMiddleware('jwt_refresh'), UserController.refreshToken);
userRouter.get('/logout', UserController.logout);
userRouter.post('/reset-password', UserController.resetUserPassword);
userRouter.post('/new-password', [validationMiddleware(updatePasswordValidationSchema), authMiddleware('jwt_reset')], UserController.newUserPassword);
userRouter.post('/avatar', [authMiddleware('jwt_access'), uploadMedia(imageFileFilter).single('avatar')], UserController.uploadAvatar);

export default userRouter;
