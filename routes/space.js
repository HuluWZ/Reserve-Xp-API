const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController.js');

// GET all Space
router.get("/spaces", spaceController.getAllSpaces);

// GET a single space by ID
router.get("/spaces/:id", spaceController.getSpaceById);

// CREATE a new space
router.post("/spaces", spaceController.createSpace);

// UPDATE a space by ID
router.put("/spaces/:id", spaceController.updateSpaceById);

// DELETE a space by ID
router.delete("/spaces/:id", spaceController.deleteSpaceById);

module.exports = router;
