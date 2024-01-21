const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
        eventName: {
            type: String,
            required: [true, "Please enter the event name"]
        },
        location: {
            type: String,
            required: [true, "Please enter the location"]
        },
        date: {
            type: Date,
            required: [true, "Please enter the date"]
        },
        startTime: {
            type: String,
            required: [true, "Please enter the start time"]
        },
        endTime: {
            type: String,
            required: [true, "Please enter the end time"]
        },
        description: {
            type: String,
            required: [true, "Please enter the description"]
        },
        organizer: {
            type: String,
            required: [true, "Please enter the organizer"]
        }
    },
    {
        timestamps: true
    }
);

const Event = mongoose.model("Event", eventSchema,"Event");
module.exports = Event;
