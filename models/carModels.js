const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
    {
        carName: {
            type: String,
            required: [true, "Please enter the car name"]
        },
        brand: {
            type: String,
        },
        price: {
            type: Number,
        },
        color: {
            type: String,
        },
    
        Content: {
            type: String,
        },
        Passenger: {
            type: Number,
        },
        GearShift: {
            type: String,
        },
        Door: {
            type: Number,
        }
    },
    {
        timestamps: true
    }
);

const Car = mongoose.model("Car", carSchema,"Car");
module.exports = Car;
