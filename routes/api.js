const express = require('express');
const router = express.Router();
const House = require('../models/House');

router.get('/', async (req, res, next) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (error) {
    next(error);
  };
});

module.exports = router;
