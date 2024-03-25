import path from 'node:path';
import fsPromise from 'fs/promises';
import PostDbService from './PostDbService.js';
import ConvertImageService from './ConvertImageService.js';
import { PATH_TO_UPLOAD_FILES } from '../constants/consts.js';

class PostService {
  constructor(postDbService, convertImageService) {
    this.postDbService = postDbService;
    this.convertImageService = convertImageService;
  }

  processPostWithMedia = async (files) => {
    const paths = await Promise.all(files.map(async (file) => {
      const ext = path.extname(file.originalname);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        await fsPromise.rename(
          path.resolve(`${PATH_TO_UPLOAD_FILES}${file.filename}`),
          path.resolve(`${PATH_TO_UPLOAD_FILES}${file.filename}${ext}`),
        );
        return file.filename + ext;
      }
      const imagePath = await this.convertImageService.convertToWebp(file);
      return imagePath;
    }));

    return paths;
  };

  createPost = async (post, files, id) => {
    const tags = post.text.match(/#[^\s#]*/g);
    if (files) {
      const paths = await this.processPostWithMedia(files);
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

  getPost = async (id) => {
    const post = await this.postDbService.getPost(id);
    return post;
  };

  deletePost = async (id) => {
    await this.postDbService.deletePost(id);
  };

  likePost = async (postId, userId) => {
    const post = await this.postDbService.getPost(postId);
    const isLiked = post.likes.find((el) => userId === el.toString());
    if (!isLiked) {
      await this.postDbService.likePost(postId, userId);
    } else {
      await this.postDbService.unlikePost(postId, userId);
    }
  };
}

export default new PostService(PostDbService, ConvertImageService);
