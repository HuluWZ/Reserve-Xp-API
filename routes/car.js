const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController.js');

// GET all Cars
router.get("/cars", carController.getAllCars);

// GET a single car by ID
router.get("/cars/:id", carController.getCarById);

// CREATE a new car
router.post("/cars", carController.createCar);

// UPDATE a car by ID
router.put("/cars/:id", carController.updateCarById);

// DELETE a car by ID
router.delete("/cars/:id", carController.deleteCarById);

module.exports = router;
