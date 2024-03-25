import { Router } from 'express';
import userRouter from './user/userRouter.js';
import postRouter from './post/postRouter.js';
import commentRouter from './comment/commentRouter.js';

const router = Router();

router.use(userRouter);
router.use(postRouter);
router.use(commentRouter);
export default router;
