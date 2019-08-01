'use strict';
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

const isFormFilled = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // erorrFormNotFilled--> es el identificador del mensaje: All fields are required
    req.flash('errorFormNotFilled', 'All fields are required');
    if (email) {
      req.flash('errorDataForm', email);
    }
    return res.redirect(req.originalUrl);
  }
  next();
};

const isIdValid = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.redirect('/');
  } else {
    next();
  }
};

// const isEditHouseFormField

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isFormFilled,
  isIdValid
};
