import jwt from 'jsonwebtoken';

class TokenService {
  constructor() {
  }

  generateTokens = async (user) => {
    const accessToken = await jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXP_IN });
    const refreshToken = await jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXP_IN });
    return {
      accessToken,
      refreshToken,
    };
  };
}

export default new TokenService();
