const {Location,LocationCategory} = require('../models/locationModel.js');

const getAllLocation = async (req, res) => {
    try {
        const location = await Location.find({});
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllLocationCategory = async (req, res) => {
    try {
        const locationCategory = await LocationCategory.find({});
        res.status(200).json(locationCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLocationId = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await Location.findById(id);

        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.status(200).json(location);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};


const getLocationCategoryId = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await LocationCategory.findById(id);

        if (!location) {
            return res.status(404).json({ message: "Location Category not found" });
        }

      res.status(200).json({ locationCategory: location });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const createLocation = async (req, res) => {
  try {
    const newLocation = await Location.create(req.body);

    res
      .status(201)
      .send({
        location: newLocation,
        message: "Location Created  Successfully !",
        success: true
      });
    
    await newLocation.save();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createLocationCategory = async (req, res) => {
  try {
    const newLocation = await LocationCategory.create(req.body);

    res
      .status(201)
      .send({
        locationCategory: newLocation,
        message: "Location Category Created  Successfully !",
        success: true
      });
    
    await newLocation.save();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateLocationById = async (req, res) => {
  try {
        const { id } = req.params;
        const updatedVendor = await Location.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedVendor) {
            return res.status(404).json({ message: "Location not found" });
        }

      res.status(200).json({ location: updatedVendor });
  } catch (error) {
        res.status(500).json({ message: error.message });
  }
};

const updateLocationCategoryById = async (req, res) => {
  try {
        const { id } = req.params;
        const updatedVendor = await LocationCategory.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedVendor) {
            return res.status(404).json({ message: "Location Category not found" });
        }

      res.status(200).json({ locationCategory: updatedVendor });
  } catch (error) {
        res.status(500).json({ message: error.message });
  }
};


const deleteLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVendor = await Location.findByIdAndDelete(id);

        if (!deletedVendor) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.status(200).json({ message: "Location deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const deleteLocationCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVendor = await LocationCategory.findByIdAndDelete(id);

        if (!deletedVendor) {
            return res.status(404).json({ message: "Location  Category not found" });
        }

        res.status(200).json({ message: "Location Category deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllLocation,
    getAllLocationCategory,
    
    getLocationCategoryId,
    getLocationId,
    
    createLocation,
    createLocationCategory,
    
  updateLocationById,
  updateLocationCategoryById,
  
  deleteLocationById,
    deleteLocationCategoryById
};
