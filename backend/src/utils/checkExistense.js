import fsPromise from 'fs/promises';

export const checkFolderExists = async (pathToStore) => {
  try {
    await fsPromise.access(pathToStore);
    return true;
  } catch (e) {
    return false;
  }
};
