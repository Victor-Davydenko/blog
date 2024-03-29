import { Router } from 'express';
import userRouter from './user/userRouter.js';
import postRouter from './post/postRouter.js';
import commentRouter from './comment/commentRouter.js';
import chatRouter from './chat/chatRouter.js';

const router = Router();

router.use(userRouter);
router.use(postRouter);
router.use(commentRouter);
router.use(chatRouter);
export default router;
