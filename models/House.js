'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const houseSchema = new Schema({
  idUser: {
    type: ObjectId,
    ref: 'User'
  },
  image: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: false
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  },
  description: {
    type: String,
    required: true,
    unique: false
  },
  area: {
    type: String,
    required: true,
    unique: false
  },
  rooms: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    required: true,
    unique: false
  },
  bathrooms: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    required: true,
    unique: false
  },
  garden: {
    type: String,
    required: true,
    unique: false
  },
  swimmingPool: {
    type: String,
    required: true,
    unique: false
  },
  privateBeach: {
    type: String,
    required: true,
    unique: false
  },
  price: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
