import passport from 'passport';
import bearer from 'passport-http-bearer';
import User from './models/user';
const Strategy = bearer.Strategy;

export default function (passport) {
    passport.use(new Strategy(
        function (token, done) {
            User.findOne({
                token: token
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));
};
