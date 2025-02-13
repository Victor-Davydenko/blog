import { PostModel } from '../db/models/post.js';
import DbError from '../exceptions/dbError.js';

class PostDbService {
  create = async (post, id) => {
    try {
      const postData = await PostModel.create({ ...post, author: id });
      return postData;
    } catch (e) {
      throw DbError.FailedToFetch(e);
    }
  };

  getAllPosts = async (query, authorId) => {
    try {
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
    } catch (e) {
      throw DbError.FailedToFetch(e);
    }
  };

  getPost = async (id) => {
    try {
      const post = await PostModel.findById(id)
        .populate('comments');
      return post;
    } catch (e) {
      throw DbError.FailedToFetch(e);
    }
  };

  deletePost = async (id) => {
    try {
      const post = await PostModel.findByIdAndDelete(id);
      return post;
    } catch (e) {
      throw DbError.FailedToFetch(e);
    }
  };

  likePost = async (postId, userId) => {
    try {
      const post = await PostModel.findByIdAndUpdate(postId, { $push: { likes: userId } });
      return post;
    } catch (e) {
      throw DbError.FailedToFetch(e);
    }
  };

  unlikePost = async (postId, userId) => {
    try {
      const post = await PostModel.findByIdAndUpdate(postId, { $pull: { likes: userId } });
      return post;
    } catch (e) {
      throw DbError.FailedToFetch(e);
    }
  };

  addView = async (postId, userId) => {
    try {
      const post = await PostModel.findByIdAndUpdate(postId, { $push: { views: userId } });
      return post;
    } catch (e) {
      throw DbError.FailedToFetch(e);
    }
  };
}

export default new PostDbService();
