
const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  addnewspace: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  spaceattributes: {
    type: String,
    required: true
  },
  spaceavailability: {
    type: Boolean,
    default: true
  },
  spacelist: {
    type: Array,
    default: []
  }
});

const Space = mongoose.model('Space', spaceSchema,"Space");

module.exports = Space;
