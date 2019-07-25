'use strict';

const express = require('express');
const User = require('../models/User.js');
const router = express.Router();

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    await User.create({
      name,
      email,
      password
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
