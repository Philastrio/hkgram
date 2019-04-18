import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false); // 여기보면 사용자 계정을 새로 생성할 수도 있다. 토큰에 id가 있고 사용자가 없다면...
    }
  } catch (error) {
    return done(error, false);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    } else {
      next();
    }
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));

passport.initialize();
