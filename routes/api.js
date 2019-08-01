const express = require('express');
const router = express.Router();
const House = require('../models/House');
const User = require('../models/User.js');
const parser = require('../config/cloudinary');

// ruta buscar casas para mapa
router.get('/', async (req, res, next) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (error) {
    next(error);
  };
});

// ruta subir multiples archivos

router.post('/image-upload', parser.single('image'), async (req, res, next) => {
  res.json(req.file.secure_url);
});

router.post('/form-sell', parser.single('image'), async (req, res, next) => {
  console.log(req.body);
  const { title, image, description, area, rooms, bathrooms, garden, swimmingPool, privateBeach, price } = req.body;
  const location = req.body.location.split(',').map(Number);
  try {
    const houses = await House.create({
      image,
      title,
      'location.coordinates': location,
      description,
      area,
      rooms,
      bathrooms,
      garden,
      swimmingPool,
      privateBeach,
      price,
      idUser: req.session.currentUser._id
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
