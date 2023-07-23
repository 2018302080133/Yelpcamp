const express = require('express');
const router = express.Router();
const usersController = require('../controller/users');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const {storeReturnTo} = require('../middleware');


router.route('/register')
      .get(usersController.renderRegister)
      .post(catchAsync(usersController.register));

router.route('/login')
      .get(usersController.renderLogin)
      .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), usersController.login);

router.get('/logout', usersController.logout);



module.exports = router;