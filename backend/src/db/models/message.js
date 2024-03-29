import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  chatId: String,
  sender: Schema.Types.ObjectId,
  text: String,
}, { timestamps: true });

export const MessageModel = mongoose.model('Message', MessageSchema);
