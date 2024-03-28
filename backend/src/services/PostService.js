import PostDbService from './PostDbService.js';
import { processPostWithMedia } from '../utils/proccessFiles.js';

class PostService {
  constructor(postDbService) {
    this.postDbService = postDbService;
  }

  createPost = async (post, files, id) => {
    const tags = post.text.match(/#[^\s#]*/g);
    if (files) {
      const paths = await processPostWithMedia(files);
      const postWithMedia = { ...post, media: paths, tags };
      const newPost = await this.postDbService.create(postWithMedia, id);
      return newPost;
    }
    const postWithTags = { ...post, tags };
    const newPost = await this.postDbService.create(postWithTags, id);
    return newPost;
  };

  getAllPosts = async (query) => {
    const allPostsData = await this.postDbService.getAllPosts(query);
    return allPostsData;
  };

  getPost = async (id, userId) => {
    await this.addView(id, userId);
    const post = await this.postDbService.getPost(id);
    return post;
  };

  deletePost = async (id) => {
    await this.postDbService.deletePost(id);
  };

  likePost = async (postId, userId) => {
    const post = await this.postDbService.getPost(postId);
    if (post) {
      const isLiked = post.likes.find((el) => userId === el.toString());
      if (!isLiked) {
        await this.postDbService.likePost(postId, userId);
      } else {
        await this.postDbService.unlikePost(postId, userId);
      }
    }
  };

  addView = async (postId, userId) => {
    const post = await this.postDbService.getPost(postId);
    if (post) {
      const isViewedByUser = post.views.find((el) => userId === el.toString());
      if (!isViewedByUser) {
        await this.postDbService.addView(postId, userId);
      }
    }
  };
}

export default new PostService(PostDbService);
