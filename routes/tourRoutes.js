const express = require('express');
const tourController = require('./../contollers/tourController');
const router = express.Router();

// Define routes for getting all tours and creating a new tour
router.param('id', tourController.checkID);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody,  tourController.createTour);
// Define routes for getting, updating, and deleting a single tour
router
    .route('/:id')
    .get(tourController.getOneTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;
