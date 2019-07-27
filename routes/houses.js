'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const House = require('../models/House');

router.get('/form-sell', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth');
  } else {
    res.render('form-sell');
  }
});

router.post('/form-sell', async (req, res, next) => {
  const { photos, title, location, description, area, rooms, bathrooms, garden, swimmingPool, privateBeach } = req.body;
  try {
    const houses = await House.create({
      photos,
      title,
      location,
      description,
      area,
      rooms,
      bathrooms,
      garden,
      swimmingPool,
      privateBeach
    });
    const houseId = houses._id;
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { $push: { houses: houseId } });
    res.redirect('/profile/sells');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
