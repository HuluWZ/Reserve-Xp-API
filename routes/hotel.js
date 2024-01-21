const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController.js');
const { uploadHotelImageAndThumbnail } = require("../middleware/fileupload");

// GET all hotels
router.get("/", hotelController.getAllHotels);
router.get("/:id", hotelController.getHotelById);
router.post("/",uploadHotelImageAndThumbnail, hotelController.createHotel);
router.put("/:id", hotelController.updateHotelById);
router.delete("/:id", hotelController.deleteHotelById);

module.exports = router;
