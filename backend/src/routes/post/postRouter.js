import { Router } from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import PostController from '../../controllers/PostController.js';
import { uploadMiddleware } from '../../middlewares/uploadMediaMiddleware.js';
import { UPLOAD_MEDIA_SETTINGS } from '../../constants/consts.js';
import { validationMiddleware } from '../../middlewares/validationMiddleware.js';
import { postValidationSchema } from '../../validationSchemas/validationSchemas.js';

const postRouter = Router();

postRouter.post(
  '/create-post',
  [validationMiddleware(postValidationSchema), authMiddleware('jwt_access'), uploadMiddleware(UPLOAD_MEDIA_SETTINGS)],
  PostController.createPost,
);
postRouter.post(
  '/:id/comment',
  [validationMiddleware(postValidationSchema), authMiddleware('jwt_access'), uploadMiddleware(UPLOAD_MEDIA_SETTINGS)],
  PostController.commentPost,
);

export default postRouter;
