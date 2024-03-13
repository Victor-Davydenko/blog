import { ExtractJwt, Strategy } from 'passport-jwt';
import UserDbService from '../services/UserDbService.js';

const accessOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET,
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
        console.log(e);
      }
    }),
  );
};

export default authStrategy;
