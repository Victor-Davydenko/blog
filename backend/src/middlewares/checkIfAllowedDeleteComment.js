import { USER_ROLES } from '../constants/consts.js';
import UserApiError from '../exceptions/userApiError.js';
import { CommentModel } from '../db/models/comment.js';

export const checkIfAllowedDeleteComment = async (req, res, next) => {
  const { user: { id, role } } = req;
  const { params: { id: postId } } = req;
  const comment = await CommentModel.findById(postId);
  const authorId = comment.author.toString();
  if (role === USER_ROLES.admin) {
    return next();
  }
  if (id === authorId) {
    return next();
  }
  return next(UserApiError.WithoutPermissons());
};
