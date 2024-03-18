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
import { checkIfAllowedDeleteAccount } from '../../middlewares/checkIfAllowedDeleteAccount.js';

const userRouter = Router();

userRouter.post('/signup', validationMiddleware(createUserValidationSchema), UserController.registration);
userRouter.post('/login', validationMiddleware(loginUserValidationSchema), UserController.login);
userRouter.get('/api/refresh', authMiddleware('jwt_refresh'), UserController.refreshToken);
userRouter.get('/logout', UserController.logout);
userRouter.post('/reset-password', UserController.resetUserPassword);
userRouter.post('/new-password', [validationMiddleware(updatePasswordValidationSchema), authMiddleware('jwt_reset')], UserController.newUserPassword);
userRouter.post('/avatar', [authMiddleware('jwt_access'), uploadMedia(imageFileFilter).single('avatar')], UserController.uploadAvatar);
userRouter.patch('/update-profile', [authMiddleware('jwt_access'), uploadMedia(imageFileFilter).single('avatar')], UserController.updateProfile);
userRouter.delete('/delete-user/:id', [authMiddleware('jwt_access'), checkIfAllowedDeleteAccount], UserController.deleteUser);

export default userRouter;
