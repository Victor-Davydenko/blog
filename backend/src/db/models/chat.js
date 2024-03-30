import mongoose, { Schema } from 'mongoose';
import ChatError from '../../exceptions/chatError.js';

const ChatSchema = new Schema({
  members: [{
    type: String,
  }],
});

ChatSchema.index({ members: 1 }, { unique: true });

// Add pre-save validation to check for duplicate member combinations
ChatSchema.pre('save', async function (next) {
  const chat = this;
  try {
    const existingChat = await mongoose.models.Chat.find({ members: { $all: chat.members } });
    if (existingChat && existingChat.length > 0) {
      const error = new ChatError(400, 'Chat already exists');
      return next(error);
    }
    next();
  } catch (err) {
    return next(err);
  }
});

export const ChatModel = mongoose.model('Chat', ChatSchema);
