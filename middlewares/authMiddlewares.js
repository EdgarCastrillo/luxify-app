'use strict';

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
  const { mail, password } = req.body;
  if (!mail || !password) {
    // erorrFormNotFilled--> es el identificador del mensaje: All fields are required
    req.flash('errorFormNotFilled', 'All fields are required');
    if (mail) {
      req.flash('errorDataForm', mail);
    }
    return res.redirect(req.originalUrl);
  }
  next();
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isFormFilled
};