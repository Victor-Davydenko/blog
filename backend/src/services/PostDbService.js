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
    const { page = 1, limit = 1, tags } = query;
    const offset = (+page - 1) * limit;
    const filter = {};
    if (authorId) {
      filter.author = authorId;
    }
    if (tags) {
      filter.tags = { $in: tags };
    }
    const allPosts = await PostModel.find(filter)
      .populate('comments')
      .limit(+limit)
      .skip(offset)
      .sort({ createdAt: -1 });
    return allPosts;
  };
}

export default new PostDbService();
