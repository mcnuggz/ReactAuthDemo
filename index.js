const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

//connect to DB and load models
require('./server/models').connect(config.dbUri);

const app = express();
//look for static files
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
//parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
//pass the passport middleware
app.use(passport.initialize());

//passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

//pass authentication checker middleware 
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

//routes
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);

//start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});