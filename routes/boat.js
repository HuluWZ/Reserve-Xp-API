const express = require('express');
const router = express.Router();
const boatController = require('../controllers/boatController.js');

// GET all Boats
router.get("/boats", boatController.getAllBoats);

// GET a single boat by ID
router.get("/boats/:id", boatController.getBoatById);

// CREATE a new boat
router.post("/boats", boatController.createBoat);

// UPDATE a boat by ID
router.put("/boats/:id", boatController.updateBoatById);

// DELETE a boat by ID
router.delete("/boats/:id", boatController.deleteBoatById);

module.exports = router;
