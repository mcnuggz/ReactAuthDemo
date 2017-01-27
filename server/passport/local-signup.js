const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    //passReqtoCallback required to be true if we want to read other parameters in POST body message
    passReqToCallback: true 
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim(),
        name: req.body.name.trim()
    };
    const newUser = new User(userData);
    newUser.save((err) => {
        if (err) {
            return done(err);
        }
        return done(null);
    });
});