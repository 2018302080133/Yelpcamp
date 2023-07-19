const express = require('express');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const campgroundsController = require('../controller/campgrounds');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');

const router = express.Router();


router.route('/')
      .get(catchAsync(campgroundsController.index))
      .post(isLoggedIn, validateCampground, catchAsync(campgroundsController.createCampground));

router.get('/new', isLoggedIn, campgroundsController.renderNewForm);

router.route('/:id')
      .get(catchAsync(campgroundsController.showCampground))
      .patch(isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundsController.updateCampground))
      .delete(isLoggedIn, isAuthor, catchAsync(campgroundsController.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundsController.renderEditForm));



module.exports = router;