'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User.js');

const saltRounds = 10;
const router = express.Router();

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword
    });
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/login', (req, res, next) => {

});

router.post('/login', (req, res, next) => {

});

router.post('/logout', (req, res, next) => {

});

module.exports = router;
