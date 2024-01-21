const Flight = require('../models/flightModels.js');

// GET all Flight
const getAllFlights = async (req, res) => {
    try {
        const flights = await Flight.find({});
        res.status(200).json(flights);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// GET a single flight by ID
const getFlightById = async (req, res) => {
    try {
        const { id } = req.params;
        const flight = await Flight.findById(id);

        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        res.status(200).json(flight);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// CREATE a new flight
const createFlight = async (req, res) => {
    try {
        const newFlight = await Flight.create(req.body);
        res.status(201).json(newFlight);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// UPDATE a flight by ID
const updateFlightById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFlight = await Flight.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedFlight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        res.status(200).json(updatedFlight);
    } catch (error) {
        console.log(error.message); // Add this line to log the error message
        res.status(500).json({ message: error.message });
    }
};

// DELETE a flight by ID
const deleteFlightById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFlight = await Flight.findByIdAndDelete(id);

        if (!deletedFlight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        res.status(200).json({ message: "Flight deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFlights,
    getFlightById,
    createFlight,
    updateFlightById,
    deleteFlightById,
};





