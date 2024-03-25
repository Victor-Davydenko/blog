import { Router } from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import PostController from '../../controllers/PostController.js';
import { uploadMiddleware } from '../../middlewares/uploadMediaMiddleware.js';
import { UPLOAD_MEDIA_SETTINGS } from '../../constants/consts.js';
import { validationMiddleware } from '../../middlewares/validationMiddleware.js';
import { postValidationSchema } from '../../validationSchemas/validationSchemas.js';
import { checkIfAllowedDeletePost } from '../../middlewares/checkIfAllowedDeletePost.js';

const postRouter = Router();

postRouter.post(
  '/create-post',
  [authMiddleware('jwt_access'), uploadMiddleware(UPLOAD_MEDIA_SETTINGS), validationMiddleware(postValidationSchema)],
  PostController.createPost,
);
postRouter.get('/all-posts', PostController.getAllPosts);
postRouter.get('/post/:id', PostController.getPost);
postRouter.delete('/delete-post/:id', [authMiddleware('jwt_access'), checkIfAllowedDeletePost], PostController.deletePost);
postRouter.patch('/like-post', authMiddleware('jwt_access'), PostController.likePost);
export default postRouter;
