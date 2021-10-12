const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const controller = require('../controllers/users-controller');

passport.use('local', new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    const user = await controller.findUserByEmail(email);
    if (!user) {
        return done(null, false, { message: 'Not User found.' });
    } else {
        const match = await controller.matchPassword(password, user.password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});

passport.deserializeUser(async(id, done) => {
    const user = await controller.findUserById(id.toString())
    done(null, user);
});