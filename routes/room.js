const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController.js');

// GET all rooms
router.get("/rooms", roomController.getAllRooms);

// GET a single room by ID
router.get("/rooms/:id", roomController.getRoomById);

// CREATE a new room
router.post("/rooms", roomController.createRoom);

// UPDATE a room by ID
router.put("/rooms/:id", roomController.updateRoomById);

// DELETE a room by ID
router.delete("/rooms/:id", roomController.deleteRoomById);

module.exports = router;
