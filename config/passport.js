const _ = require('lodash');
const passport = require('passport');
// const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const httpStatus = require('http-status');
const APIError = require('../server/utils/APIError');


const demoUsers = [
    {
        '01-u1': {
            id: '01-u1',
            email: 'x700700@gmail.com',
            password: 'Asdf12',
        },
    },
];


// source: https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d


// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
            const user = demoUsers.map(x => _.map(x)[0]).find(x => x.email.toLowerCase() === email.toLowerCase().trim());
            if (!user) {
                return done(null, false, { message: `User [${email}] not found` });
            }
            // if (!bcrypt.compareSync(password, user.password)) {
            if (password !== user.password) {
                return done(null, false, { message: `Invalid password [${password}]` });
            }
            return done(null, user);
        // .catch(error => done(error));
    },
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = demoUsers.map(x => _.map(x)[0]).find(x => x.id === id);
    if (user) {
        done(null, user);
    } else {
        throw new APIError(`user id=[${id}] not found`, httpStatus.UNAUTHORIZED, { isPublic: true });
        // done(error, false);
    }
    /*
    axios.get(`http://localhost:5000/users/${id}`)
        .then(res => done(null, res.data) )
        .catch(error => done(error, false))
        */
});

module.exports = passport;

/*
module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        const user = demoUsers[id];
        let err;
        if (!user) {
            err = 'no user';
        }
        done(err, user);
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true, // allows us to pass back the entire request to the callback
        },
        (req, email, password, done) => {
            process.nextTick(() => {
                const user = demoUsers.find(x => x.email === email);
                let err;
                if (user) {
                    err = 'user not found';
                }
                return done(err, user);
            });
        }));
};
*/
