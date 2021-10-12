const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');

const controller = {};

controller.autenticate = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successFlash: true,
    failureFlash: true,
    successRedirect: '/notes'
});

controller.signUp = async(req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    if (password != confirm_password) {
        errors.push({ text: 'Password do not match' });
    }
    if (name.length <= 0) {
        errors.push({ text: 'Please insert a name' })
    }
    if (email.length <= 0) {
        errors.push({ text: 'Please insert an email' })
    }
    if (password.length <= 0) {
        errors.push({ text: 'Please insert a password' })
    } else {
        if (password.length < 4) {
            errors.push({ text: 'Password must be at least 4 characters.' })
        }
    }
    if (confirm_password.length <= 0) {
        errors.push({ text: 'Please insert confirmation password' })
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        if (await controller.validateEmail(email)) {
            req.flash('error_msg', 'Email already in use.');
            res.redirect('/users/signup');
        } else {
            controller.newUser(req, res);
            res.redirect('/users/signin');
        }
    }
};

controller.getSignUp = (req, res) => {
    res.render('users/signup');
};

controller.getSignIn = (req, res) => {
    res.render('users/signin');
}

controller.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

controller.matchPassword = async(password, password_db) => {
    return await bcrypt.compare(password, password_db);
};

controller.findUserByEmail = async(email) => {
    return await User.findOne({ email: email }).lean();
};

controller.findUserById = async(id) => {
    return await User.findById({ _id: id }).lean();
};

controller.validateEmail = async(email) => {

    const userEmail = await User.findOne({ email: email }).lean();
    return userEmail ? true : false;
};

controller.newUser = async(req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const newUser = new User({ name, email, password, confirm_password });
    newUser.password = await controller.encryptPassword(password);
    newUser.save();
    req.flash('success_msg', 'Now you are register');
};

controller.logout = (req, res) => {
    req.logOut();
    res.redirect('/');
};

module.exports = controller;