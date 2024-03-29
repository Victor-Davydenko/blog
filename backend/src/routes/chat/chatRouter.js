import { Router } from 'express';
import ChatController from '../../controllers/ChatController.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const chatRouter = Router();

chatRouter.post('/new-chat', authMiddleware('jwt_access'), ChatController.newChat);
chatRouter.get('/chats', authMiddleware('jwt_access'), ChatController.getChats);
chatRouter.post('/new-message', authMiddleware('jwt_access'), ChatController.newMessage);
chatRouter.get('/messages', authMiddleware('jwt_access'), ChatController.getMessages);
export default chatRouter;
