'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User.js');

const saltRounds = 10;
const router = express.Router();

router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    // res.redirect('/home');
  }
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
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

router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    // res.redirect('/home');
  }
  res.render('login');
});

router.post('/login', async (req, res, next) => {
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

router.post('/logout', (req, res, next) => {

});

module.exports = router;
