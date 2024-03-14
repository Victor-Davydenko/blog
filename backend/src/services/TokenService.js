import jwt from 'jsonwebtoken';

class TokenService {
  generateTokens = (user) => {
    const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXP_IN });
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXP_IN });
    return {
      accessToken,
      refreshToken,
    };
  };

  generateResetPasswordToken = (user) => {
    const resetPasswordToken = jwt.sign(user, process.env.JWT_RESET_PASSWORD_SECRET, { expiresIn: process.env.JWT_RESET_PASSWORD_EXP_IN });
    return resetPasswordToken;
  };
}

export default new TokenService();
