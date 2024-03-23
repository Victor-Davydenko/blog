import { PostModel } from '../db/models/post.js';
import { CommentModel } from '../db/models/comment.js';

class PostDbService {
  create = async (post, id) => PostModel.create({ ...post, author: id });

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

  getAllPosts = async (query, authorId) => {
    const { page = 1, limit = 200, tag } = query;
    const offset = (+page - 1) * limit;
    const filter = {};
    if (authorId) {
      filter.author = authorId;
    }
    if (tag) {
      filter.tags = { $in: tag };
    }
    const allPosts = await PostModel.find(filter)
      .populate('comments')
      .limit(+limit)
      .skip(offset)
      .sort({ createdAt: -1 });
    return allPosts;
  };

  getPost = async (id) => {
    const post = await PostModel.findById(id)
      .populate('comments');
    return post;
  };

  deletePost = async (id) => {
    await PostModel.findByIdAndDelete(id);
  };

  getComment = async (id) => {
    const comment = CommentModel.findById(id)
      .populate('comments');
    return comment;
  };

  deleteComment = async (id) => {
    await CommentModel.findByIdAndDelete(id);
  };
}

export default new PostDbService();
