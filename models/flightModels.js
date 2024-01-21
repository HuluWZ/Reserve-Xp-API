
const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true
  },
  airplane: {
    type: String,
    required: true
  },
  airport: {
    type: String,
    required: true
  },
  flightList: {
    type: Array,
    required: true
  },
  seatType: {
    type: String,
    required: true
  }
});

const Flight = mongoose.model('Flight', flightSchema,"Flight");

module.exports = Flight;
