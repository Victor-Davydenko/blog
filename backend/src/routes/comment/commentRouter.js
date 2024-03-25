import { Router } from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import { uploadMiddleware } from '../../middlewares/uploadMediaMiddleware.js';
import { UPLOAD_MEDIA_SETTINGS } from '../../constants/consts.js';
import { validationMiddleware } from '../../middlewares/validationMiddleware.js';
import { postValidationSchema } from '../../validationSchemas/validationSchemas.js';
import { checkIfAllowedDeleteComment } from '../../middlewares/checkIfAllowedDeleteComment.js';
import CommentController from '../../controllers/CommentController.js';

const commentRouter = Router();

commentRouter.post(
  '/:id/comment',
  [authMiddleware('jwt_access'), uploadMiddleware(UPLOAD_MEDIA_SETTINGS), validationMiddleware(postValidationSchema)],
  CommentController.commentPost,
);
commentRouter.get('/comment/:id', CommentController.getComment);
commentRouter.delete('/delete-comment/:id', [authMiddleware('jwt_access'), checkIfAllowedDeleteComment], CommentController.deleteComment);
commentRouter.patch('/like-comment', authMiddleware('jwt_access'), CommentController.likeComment);

export default commentRouter;
