const express = require('express');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const campgroundsController = require('../controller/campgrounds');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');

const router = express.Router();


router.get('/', catchAsync(campgroundsController.index));

router.get('/new', isLoggedIn, campgroundsController.renderNewForm);

router.post('/', isLoggedIn, validateCampground, catchAsync(campgroundsController.createCampground));

router.get('/:id', catchAsync(campgroundsController.showCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundsController.renderEditForm));

router.patch('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundsController.updateCampground));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgroundsController.deleteCampground));



module.exports = router;