const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController.js');
// GET all Events
router.get("/events", eventController.getAllEvents);

// GET a single event by ID
router.get("/events/:id", eventController.getEventById);

// CREATE a new event
router.post("/events", eventController.createEvent);

// UPDATE an event by ID
router.put("/events/:id", eventController.updateEventById);

// DELETE an event by ID
router.delete("/events/:id", eventController.deleteEventById);

module.exports = router;
