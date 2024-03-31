import { Server } from 'socket.io';
import { logger } from '../utils/logger.js';
import ChatDbService from '../services/ChatDbService.js';

const io = new Server({
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

const users = new Set();
const connected = [];
io.on('connection', (socket) => {
  socket.on('user_connected', (userId) => {
    const userData = {
      userId,
      socketId: socket.id,
    };
    if (!users.has(userId)) {
      connected.push(userData);
      users.add(userId);
    }
  });
  socket.on('message', async (messageData) => {
    const message = {
      chatId: messageData.chatId,
      sender: messageData.sender,
      text: messageData.text,
    };
    const newMessage = await ChatDbService.newMessage(message);
    const recieverSocketId = connected.find((user) => user.userId === messageData.receiver).socketId;
    socket.to(recieverSocketId).emit('get_message', newMessage);
  });
  socket.on('disconnect', () => {
    logger.info('user disconnected');
  });
});

export { io };
