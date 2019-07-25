'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Luxurify' });
  res.redirect('/auth/signup');
});

module.exports = router;
