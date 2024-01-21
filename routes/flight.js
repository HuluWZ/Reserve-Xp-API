const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController.js');

// GET all Flight
router.get("/flights", flightController.getAllFlights);

// GET a single flight by ID
router.get("/flights/:id", flightController.getFlightById);

// CREATE a new flight
router.post("/flights", flightController.createFlight);

// UPDATE a flight by ID
router.put("/flights/:id", flightController.updateFlightById);

// DELETE a flight by ID
router.delete("/flights/:id", flightController.deleteFlightById);

module.exports = router;
