// Require Node Modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Initialization

const app = express();
require('./database');
require('./config/passport');

// Settings

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', exphbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');

// Middleware

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variable

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Routes

app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files

app.use(express.static(path.join(__dirname, 'public')));

// Server
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'))
});