const Tour = require('../models/TourModels.js');

// GET all Tours
const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find({});
        res.status(200).json(tours);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// GET a single tour by ID
const getTourById = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findById(id);

        if (!tour) {
            return res.status(404).json({ message: "Tour not found" });
        }

        res.status(200).json(tour);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// CREATE a new tour
const createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json(newTour);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE a tour by ID
const updateTourById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTour = await Tour.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTour) {
            return res.status(404).json({ message: "Tour not found" });
        }

        res.status(200).json(updatedTour);
    } catch (error) {
        console.log(error.message); // Add this line to log the error message
        res.status(500).json({ message: error.message });
    }
};

// DELETE a tour by ID
const deleteTourById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTour = await Tour.findByIdAndDelete(id);

        if (!deletedTour) {
            return res.status(404).json({ message: "Tour not found" });
        }

        res.status(200).json({ message: "Tour deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTours,
    getTourById,
    createTour,
    updateTourById,
    deleteTourById,
};
