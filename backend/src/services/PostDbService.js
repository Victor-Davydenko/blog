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

  getAllPosts = async (query) => {
    const { page = 1, limit = 3 } = query;
    const offset = (+page - 1) * limit;
    const allPosts = await PostModel.find({})
      .limit(+limit)
      .skip(offset)
      .sort({ createdAt: -1 });
    const count = await PostModel.countDocuments();
    const totalPages = Math.ceil(count / limit);
    return {
      allPosts,
      totalPages,
    };
  };
}

export default new PostDbService();
