'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User.js');

const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddlewares.js');
const saltRounds = 10;
const router = express.Router();

router.get('/', isLoggedIn, (req, res, next) => {
  // if (req.session.currentUser) {
  //   res.render('/');
  // } else {
  res.render('login');
});

router.post('/login', isLoggedIn, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (bcrypt.compareSync(password, user.password)) {
      // Save the login in the session!
      req.session.currentUser = user;
      res.redirect('/');
    } else {
      res.redirect('/auth/login');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/signup', isLoggedIn, (req, res, next) => {
  // if (req.session.currentUser) {
  //   // res.redirect('/home');
  // }
  // res.render('signup');
  const data = {
    messages: req.flash('errorFormNotFilled') };
  res.render('signup', data);
});

router.post('/signup', isLoggedIn, isFormFilled, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });
    req.session.currentUser = newUser;
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.post('/logout', isNotLoggedIn, (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;
