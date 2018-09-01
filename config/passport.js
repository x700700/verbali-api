const _ = require('lodash');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
// const httpStatus = require('http-status');
const User = require('../server/model/user.model');


// source: https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d


passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    return done(`Invalid email [${email}]`, null);
                }
                if (!bcrypt.compareSync(password, user.passwordHash)) {
                    return done(`Invalid password [${password}]`, null);
                }
                return done(null, user);
            })
            .catch(e => done(e));
    },
));


// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.get(id)
        .then((user) => {
            if (user) {
                done(null, user);
            } else {
                done(`user id=[${id}] not found`, false);
            }
        })
        .catch(e => done(e));
});

module.exports = passport;
