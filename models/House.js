'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false
  },
  location: {
    type: 'Point',
    cordinates: []
  },
  description: {
    type: String,
    required: true,
    unique: false
  },
  details: {
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
      type: Boolean,
      required: true,
      unique: false
    },
    swimming pool: {
      type: Boolean,
      required: true,
      unique: false
    },
    private beach: {
      type: Boolean,
      required: true,
      unique: false
    }
  }
}, {
  timestamps: true
});

const House = mongoose.model('House', userSchema);

module.exports = House;
