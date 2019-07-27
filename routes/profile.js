'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/User.js');
const House = require('../models/House.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth');
  } else {
    const user = req.session.currentUser;
    res.render('profile', { user });
  }
});

router.get('/edit', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth');
  } else {
    const user = req.session.currentUser;
    res.render('edit', { user });
  }
});

router.post('/edit', async (req, res, next) => {
  try {
    const { name, phone, surname, email, location } = req.body;
    const { _id } = req.session.currentUser;
    const newUser = await User.findByIdAndUpdate(_id, { name, phone, surname, email, location }, { new: true });
    req.session.currentUser = newUser;
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});

router.post('/delete', async (req, res, next) => {
  try {
    const id = req.session.currentUser._id;
    await User.findByIdAndDelete(id);
    delete req.session.currentUser;
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/sells', async (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth');
  } else {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId).populate('houses');
    res.render('mySells', user);
  }
});

router.get('/save', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth');
  } else {
    res.render('save');
  }
});

router.get('/messages', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth');
  } else {
    res.render('messages');
  }
});

module.exports = router;
