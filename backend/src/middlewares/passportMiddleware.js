import { ExtractJwt, Strategy } from 'passport-jwt';
import UserDbService from '../services/UserDbService.js';
import { refreshTokenExtractorFromCookie } from '../utils/refreshTokenExtractorFromCookie.js';
import { accessTokenExtractorFromRequest } from '../utils/accessTokenExtractorFromRequest.js';
import { logger } from '../utils/logger.js';

const accessOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET,
};

const refreshOption = {
  jwtFromRequest: refreshTokenExtractorFromCookie,
  secretOrKey: process.env.JWT_REFRESH_SECRET,
};

const resetPasswordOptions = {
  jwtFromRequest: accessTokenExtractorFromRequest,
  secretOrKey: process.env.JWT_RESET_PASSWORD_SECRET,
};

const authStrategy = (passport) => {
  passport.use(
    'jwt_access',
    new Strategy(accessOption, async (payload, done) => {
      const { id } = payload;
      try {
        const user = await UserDbService.findById(id);
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        logger.error(e.message);
      }
    }),
  );

  passport.use(
    'jwt_refresh',
    new Strategy(refreshOption, async (payload, done) => {
      const { id } = payload;
      try {
        const user = await UserDbService.findById(id);
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        logger.error(e.message);
      }
    }),
  );

  passport.use(
    'jwt_reset',
    new Strategy(resetPasswordOptions, async (payload, done) => {
      const { id } = payload;
      try {
        const user = await UserDbService.findById(id);
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        logger.error(e.message);
      }
    }),
  );
};

export default authStrategy;
