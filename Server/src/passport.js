const passport = require('passport');
const JsonStrategy = require('passport-json').Strategy;
const passportJWT = require('passport-jwt');
const { SECRET_KEY } = require('./config/config');
const pool = require('./connection');
const { getUser } = require('./controller/services/userService');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const userService = require('./controller/services/userService')

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
  // algorithms: ['RS256']
};


passport.use(new JsonStrategy({
  usernameProp: 'email',
  passwordProp: 'password',
}, (email, password, cb) => getUser({ email }).then((user) => {
  if (!user) {
    return cb(null, false);
  }
  if (password == user.password) {
    return cb(null, user);
  }
  // return bcrypt.compare(password, user.password).then((valid) => {
  //   if (valid) {
  //     return cb(null, user);
  //   }
  //   return cb(null, false);
  // }).catch((err) => {
  //   cb(new Error({ 'passport error': 101 }));
  // });
}).catch((err) => {
  cb(new Error({ 'passport error': 102 }));
})));

passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, cb) => {
  try {
    if (jwtPayload) {
      const user = await userService.getUser({ email: jwtPayload.email });
      if (user) {

        user.userId = user.id;
        return cb(null, user);
      } else {
        cb(new Error('unauthorized user'));
      }
    }
  } catch (error) {
    cb(error);
  }
}));

module.exports = passport;
