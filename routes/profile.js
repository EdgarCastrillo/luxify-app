'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth');
  } else {
    res.render('profile');
  }
});

module.exports = router;
