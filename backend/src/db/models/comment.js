import mongoose, { Schema } from 'mongoose';

export const CommentSchema = new Schema({
  text: String,
  media: [{
    type: Schema.Types.String,
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  views: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  tags: [
    { type: Schema.Types.String },
  ],
}, { timestamps: true });

export const CommentModel = mongoose.model('Comment', CommentSchema);
