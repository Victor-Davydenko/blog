import { PostModel } from '../db/models/post.js';
import { CommentModel } from '../db/models/comment.js';

class CommentDbService {
  comment = async (comment, parentPostId, userId) => {
    const newComment = await CommentModel.create({ ...comment, author: userId });
    if (!newComment) {
      throw new Error('something went wrong');
    }
    const updatedPost = await PostModel.findByIdAndUpdate(parentPostId, { $push: { comments: newComment.id } });
    if (!updatedPost) {
      await CommentModel.findByIdAndUpdate(parentPostId, { $push: { comments: newComment.id } });
    }
    return newComment;
  };

  getComment = async (id) => {
    const comment = CommentModel.findById(id)
      .populate('comments');
    return comment;
  };

  deleteComment = async (id) => {
    await CommentModel.findByIdAndDelete(id);
  };

  likeComment = async (commentId, userId) => {
    await CommentModel.findByIdAndUpdate(commentId, { $push: { likes: userId } });
  };

  unlikeComment = async (commentId, userId) => {
    await CommentModel.findByIdAndUpdate(commentId, { $pull: { likes: userId } });
  };

  addView = async (commentId, userId) => {
    await CommentModel.findByIdAndUpdate(commentId, { $push: { views: userId } });
  };
}

export default new CommentDbService();
