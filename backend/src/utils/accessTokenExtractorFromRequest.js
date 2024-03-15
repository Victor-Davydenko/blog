export const accessTokenExtractorFromRequest = (req) => {
  let token = null;
  if (req && req.headers.authorization) {
    [, token] = req.headers.authorization.split(' ');
  } else {
    token = req.query.t;
  }
  return token;
};
