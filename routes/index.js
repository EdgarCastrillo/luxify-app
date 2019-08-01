'use strict';

const express = require('express');
const router = express.Router();

const House = require('../models/House');

router.get('/', async (req, res, next) => {
  try {
    if (!req.session.currentUser) {
      res.redirect('/auth/login');
    } else {
      const { _id } = req.session.currentUser;
      const houses = await House.find().where('idUser').ne(_id).sort({ price: 1 }).limit(5);
      const housesNearYou = await House.find().where('idUser').ne(_id).sort({ price: -1 }).limit(5);
      const newHouses = await House.find().where('idUser').ne(_id).sort({ createdAt: -1 }).limit(2);
      res.render('index', { houses, newHouses, housesNearYou });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
