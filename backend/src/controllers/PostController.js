import PostService from '../services/PostService.js';

class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  createPost = async (req, res, next) => {
    try {
      const { body: post, user: { id }, files } = req;
      const newPost = await this.postService.createPost(post, files, id);
      res.status(201).json({
        status: 201,
        message: 'Post has been successfully created',
        post: newPost,
      });
    } catch (e) {
      next();
    }
  };

  getAllPosts = async (req, res, next) => {
    try {
      const { query } = req;
      const allPostsData = await this.postService.getAllPosts(query);
      res.json({
        status: 200,
        message: 'Ok',
        allPostsData,
      });
    } catch (e) {
      next(e);
    }
  };

  getPost = async (req, res, next) => {
    try {
      const { params: { id } } = req;
      const userId = req?.cookies?.id;
      const post = await this.postService.getPost(id, userId);
      res.json({
        status: 200,
        message: 'Ok',
        post,
      });
    } catch (e) {
      next();
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { params: { id } } = req;
      await this.postService.deletePost(id);
      res.status(204).json();
    } catch (e) {
      next(e);
    }
  };

  likePost = async (req, res, next) => {
    try {
      const { user: { id: userId } } = req;
      const { postId } = req.body;
      await this.postService.likePost(postId, userId);
      res.status(204).json();
    } catch (e) {
      next(e);
    }
  };
}

export default new PostController(PostService);
