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
  const { photos, title, location, description, area, rooms, bathrooms, garden, swimmingPool, privateBeach, price } = req.body;
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
      privateBeach,
      price
    });
    const houseId = houses._id;
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { $push: { houses: houseId } });
    res.redirect('/profile/sells');
  } catch (error) {
    next(error);
  }
});

router.get('/sells/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const house = await House.findById(id);
    res.render('house-details', house);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
