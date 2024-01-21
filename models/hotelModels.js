
const mongoose = require("mongoose");
const Location = require("../models/locationModel")

const hotelSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter the hotel title"]
        },
        content: {
            type: String,
            required: [true, "Please enter the content"]
        },
        ytLink: {
            type: String,
            required: [true, "Please enter the youtube link"]
        },
        images: {
            type: [String], 
            required: [true, "Please provide at least 2 images"]
        },
        thumbnail: {
            type: String,
            required: [true, "Please enter thumbnail "]
        },
        rating: {
                type: String,
                required:[true,"Hotel Policy Rating required"]
        },
        hotelPolicy: [{
                title: { type: String, required: [true, "Policy Title is required"] },
                content:{type: String,required:[true,"Policy Content is required"]}

        }],
        checkIn: {type: String, required:[true,"Check In time required"]},
        checkOut: { type: String, required:[true,"Check Out time required"]},
        minReservation: {type: Number},
        minStay:{type: Number},
        price: { type: Number, min: 0, required: [true, "Hotel Price is required"] },
        extraPrice: [{
            name: {type:String},
            price: {type: Number},
            type: {type: String, enum:["OneTime","PerPerson"]}
        }],
        serviceFee: [{
            name: {type:String},
            price: {type:Number},
            type: {type: String, enum:["OneTime","PerPerson"]}

        }],
        location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location',
            required:[true,"Location is required"]
        },
        realAddress: { type: String, required: true },
        mapLink: { type: String, required: true },
        education: [{
            name: { type: String },
            content: { type: String },
            distance: { type: Number }

        }],
        health: [{
            name: { type: String },
            content: { type: String },
            distance: { type: Number }

        }],
        transportation: [{
            name: { type: String },
            content: { type: String },
            distance: { type: Number }

        }],


    },
    {
        timestamps: true
    }
);

const Hotel = mongoose.model("Hotel", hotelSchema,"Hotel");
module.exports = Hotel;
