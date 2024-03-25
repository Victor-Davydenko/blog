import { PostModel } from '../db/models/post.js';

class PostDbService {
  create = async (post, id) => PostModel.create({ ...post, author: id });

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

  likePost = async (postId, userId) => {
    await PostModel.findByIdAndUpdate(postId, { $push: { likes: userId } });
  };

  unlikePost = async (postId, userId) => {
    await PostModel.findByIdAndUpdate(postId, { $pull: { likes: userId } });
  };
}

export default new PostDbService();
