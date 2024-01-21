const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController.js');

// GET all Tours
router.get("/tours", tourController.getAllTours);

// GET a single tour by ID
router.get("/tours/:id", tourController.getTourById);

// CREATE a new tour
router.post("/tours", tourController.createTour);

// UPDATE a tour by ID
router.put("/tours/:id", tourController.updateTourById);

// DELETE a tour by ID
router.delete("/tours/:id", tourController.deleteTourById);


module.exports = router;
