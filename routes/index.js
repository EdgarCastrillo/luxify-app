'use strict';

const express = require('express');
const router = express.Router();

const House = require('../models/House');

router.get('/', async (req, res, next) => {
  try {
    if (!req.session.currentUser) {
      res.redirect('/auth');
    } else {
      const { _id } = req.session.currentUser;
      const houses = await House.find().where('idUser').ne(_id).sort({ price: 1 }).limit(5);
      const data = {
        houses
      };
      res.render('index', data);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
