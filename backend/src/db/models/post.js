import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  text: String,
  media: [{
    type: Schema.Types.String,
  }],
  tags: [
    { type: Schema.Types.String },
  ],
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
}, { timestamps: true });

export const PostModel = mongoose.model('Post', PostSchema);
