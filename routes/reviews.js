const express = require('express');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviewsController = require('../controller/reviews');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');


const router = express.Router({mergeParams: true});


router.post('/', isLoggedIn, validateReview, catchAsync(reviewsController.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewsController.deleteReview));


module.exports = router;