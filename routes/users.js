const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', catchAsync(async(req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.flash('success', `Welcome to ratemycamp, ${username}`)
        res.redirect('/campgrounds');
    } catch (e) {
        if (e.message === `E11000 duplicate key error collection: yelp-camp.users index: email_1 dup key: { email: "${email}" }`) {
            req.flash('error', e.message = 'Oops, the email already registered!')
            res.redirect('register');
        } else {
            req.flash('error', e.message);
            res.redirect('register')
        }
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', 
        passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), 
        (req, res) => {
    req.flash('success', 'Welcome Back')
    res.redirect('/campgrounds')
})

module.exports = router;