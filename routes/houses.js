'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const House = require('../models/House');
const parser = require('../config/cloudinary');

router.get('/form-sell', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth');
  } else {
    res.render('form-sell');
  }
});

router.post('/form-sell', parser.single('image'), async (req, res, next) => {
  const { title, location, description, area, rooms, bathrooms, garden, swimmingPool, privateBeach, price } = req.body;
  const imageurl = req.file.secure_url;
  try {
    const houses = await House.create({
      image: imageurl,
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
    const house = await House.findById(id);
    res.render('house-details', house);
  } catch (error) {
    next(error);
  }
});

router.get('/sells/:id/edit', async (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/auth');
  } else {
    const id = req.params.id;
    const house = await House.findById(id).reverse();
    res.render('edit-house', house);
  }
});

router.post('/sells/:id/edit', async (req, res, next) => {
  try {
    const id = req.params.id;
    const house = req.body;
    await House.findByIdAndUpdate(id, house);
    res.redirect('/profile/sells');
  } catch (error) {
    next(error);
  }
});

router.post('/sells/:id/delete', async (req, res, next) => {
  try {
    const { id } = req.params;
    await House.findByIdAndDelete(id);
    // res.json({ message: 'House deleted' });
    res.redirect('/profile/sells');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
