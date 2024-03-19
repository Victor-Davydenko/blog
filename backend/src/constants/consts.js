export const USER_ROLES = {
  admin: 'ADMIN',
  user: 'USER',
  guest: 'GUEST',
};

export const REFRESH_COOKIE_MAX_AGE = 7 * 24 * 60 * 1000; // 7 days

export const MAX_FILE_SIZE_TO_UPLOAD = 50 * 1024 * 1024; // 50 Mb

export const PATH_TO_UPLOAD_FILES = 'public/uploads/';

export const ALLOWED_IMG_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

export const ALLOWED_VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi', '.webm'];

export const UPLOAD_AVATAR_SETTINGS = {
  fieldName: 'avatar',
  maxCount: 1,
  allowedExtensions: ALLOWED_IMG_EXTENSIONS,
};

export const UPLOAD_MEDIA_SETTINGS = {
  fieldName: 'media',
  maxCount: 4,
  allowedExtensions: [...ALLOWED_VIDEO_EXTENSIONS, ...ALLOWED_IMG_EXTENSIONS],
};
