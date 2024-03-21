import { Router } from 'express';
import UserController from '../../controllers/UserController.js';
import { validationMiddleware } from '../../middlewares/validationMiddleware.js';
import {
  createUserValidationSchema,
  loginUserValidationSchema,
  updatePasswordValidationSchema,
} from '../../validationSchemas/validationSchemas.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import { uploadMiddleware } from '../../middlewares/uploadMediaMiddleware.js';
import { checkIfAllowedDeleteAccount } from '../../middlewares/checkIfAllowedDeleteAccount.js';
import { UPLOAD_AVATAR_SETTINGS } from '../../constants/consts.js';

const userRouter = Router();

userRouter.post('/signup', validationMiddleware(createUserValidationSchema), UserController.registration);
userRouter.post('/login', validationMiddleware(loginUserValidationSchema), UserController.login);
userRouter.get('/api/refresh', authMiddleware('jwt_refresh'), UserController.refreshToken);
userRouter.get('/logout', UserController.logout);
userRouter.post('/reset-password', UserController.resetUserPassword);
userRouter.post('/new-password', [validationMiddleware(updatePasswordValidationSchema), authMiddleware('jwt_reset')], UserController.newUserPassword);
userRouter.post('/avatar', [authMiddleware('jwt_access'), uploadMiddleware(UPLOAD_AVATAR_SETTINGS)], UserController.uploadAvatar);
userRouter.patch('/update-profile', [authMiddleware('jwt_access'), uploadMiddleware(UPLOAD_AVATAR_SETTINGS)], UserController.updateProfile);
userRouter.delete('/delete-user/:id', [authMiddleware('jwt_access'), checkIfAllowedDeleteAccount], UserController.deleteUser);
userRouter.get('/user/:id', UserController.getUserProfile);

export default userRouter;
