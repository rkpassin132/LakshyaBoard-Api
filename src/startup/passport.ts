import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { findUser } from "../service/user.service";

const opts: any = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    let user = await findUser({ _id: jwt_payload._id });
    if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
);
