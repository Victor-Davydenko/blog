import { PostModel } from '../db/models/post.js';
import { CommentModel } from '../db/models/comment.js';
import DbError from '../exceptions/dbError.js';

class CommentDbService {
  comment = async (comment, parentPostId, userId) => {
    try {
      const newComment = await CommentModel.create({ ...comment, author: userId });
      if (!newComment) {
        throw DbError.FailedToFetch();
      }
      const updatedPost = await PostModel.findByIdAndUpdate(parentPostId, { $push: { comments: newComment.id } });
      if (!updatedPost) {
        await CommentModel.findByIdAndUpdate(parentPostId, { $push: { comments: newComment.id } });
      }
      return newComment;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };

  getComment = async (id) => {
    try {
      const comment = await CommentModel.findById(id)
        .populate('comments');
      return comment;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };

  deleteComment = async (id) => {
    try {
      const comment = await CommentModel.findByIdAndDelete(id);
      return comment;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };

  likeComment = async (commentId, userId) => {
    try {
      const comment = await CommentModel.findByIdAndUpdate(commentId, { $push: { likes: userId } });
      return comment;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };

  unlikeComment = async (commentId, userId) => {
    try {
      const comment = await CommentModel.findByIdAndUpdate(commentId, { $pull: { likes: userId } });
      return comment;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };

  addView = async (commentId, userId) => {
    try {
      const comment = await CommentModel.findByIdAndUpdate(commentId, { $push: { views: userId } });
      return comment;
    } catch (e) {
      throw DbError.FailedToFetch();
    }
  };
}

export default new CommentDbService();
