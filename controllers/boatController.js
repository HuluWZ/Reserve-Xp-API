const Boat = require('../models/boatModels.js');

// GET all Boats
const getAllBoats = async (req, res) => {
    try {
        const boats = await Boat.find({});
        res.status(200).json(boats);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// GET a single boat by ID
const getBoatById = async (req, res) => {
    try {
        const { id } = req.params;
        const boat = await Boat.findById(id);

        if (!boat) {
            return res.status(404).json({ message: "Boat not found" });
        }

        res.status(200).json(boat);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// CREATE a new boat
const createBoat = async (req, res) => {
    try {
        const newBoat = await Boat.create(req.body);
        res.status(201).json(newBoat);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE a boat by ID
const updateBoatById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBoat = await Boat.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBoat) {
            return res.status(404).json({ message: "Boat not found" });
        }

        res.status(200).json(updatedBoat);
    } catch (error) {
        console.log(error.message); // Add this line to log the error message
        res.status(500).json({ message: error.message });
    }
};

// DELETE a boat by ID
const deleteBoatById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBoat = await Boat.findByIdAndDelete(id);

        if (!deletedBoat) {
            return res.status(404).json({ message: "Boat not found" });
        }

        res.status(200).json({ message: "Boat deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBoats,
    getBoatById,
    createBoat,
    updateBoatById,
    deleteBoatById,
};





