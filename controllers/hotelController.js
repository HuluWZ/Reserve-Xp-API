const Hotel = require('../models/hotelModels.js');
const uploadToCloud = require("../config/cloudinary");


const uploadMultipleImages = async (files) => {
  var imageUrlList = []
  for (let i = 0; i < files.length; i++){
       const {url}= await uploadToCloud(files[i].filename);
       imageUrlList.push(url);
  }
  return imageUrlList;
}

const getAllHotels = async (req, res) => {
  try {
    const hotel = await Hotel.find({});
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single hotel by ID
const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// CREATE a new hotel
const createHotel = async (req, res) => {
  try {
    var hotelData = req.body;
    console.log(" Body ",req.body)
    const { url } = await uploadToCloud(req.files.thumbnail[0].filename)
    console.log(" Thumbnail ",url)
    hotelData.thumbnail = url
    const urls = await uploadMultipleImages(req.files.images);
    console.log(" All Images ",urls)
    hotelData.images = urls
    const newHotel = await Hotel.create(hotelData);
    
    res.status(201).json({ hotel: newHotel, message: "Hotel Created Successfully" });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ hotel: updatedHotel });
  } catch (error) {
    console.log(error.message); // Add this line to log the error message
    res.status(500).json({ message: error.message });
  }
};

const deleteHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHotel = await Hotel.findByIdAndDelete(id);

    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotelById,
  deleteHotelById,
};







