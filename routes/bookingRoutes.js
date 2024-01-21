// bookingRoute.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking');

router.post('/book', (req, res) => {
    const { roomNumber, date } = req.body;
    console.log('roomNumber:', roomNumber);
    console.log('date:', date);
    const booking = bookingController.bookRoom(roomNumber, date);
    res.json(booking);
});

router.get('/check-availability', (req, res) => {
    const { roomNumber, date } = req.query;
    console.log('roomNumber:', roomNumber);
    console.log('date:', date);
    const isAvailable = !bookingController.checkAvailability(roomNumber, date);
    res.json({ isAvailable });
});

module.exports = router;
