import { Router } from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import PostController from '../../controllers/PostController.js';
import { uploadMedia } from '../../middlewares/uploadMediaMiddleware.js';
import { imageFileFilter } from '../../utils/fileFilters.js';

const postRouter = Router();

postRouter.post('/create-post', [authMiddleware('jwt_access'), uploadMedia(imageFileFilter).array('media', 4)], PostController.createPost);
postRouter.post('/:id/comment', [authMiddleware('jwt_access'), uploadMedia(imageFileFilter).array('media', 4)], PostController.commentPost);

export default postRouter;
