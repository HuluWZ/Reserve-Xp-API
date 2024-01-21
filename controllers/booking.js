const express = require('express');
const Room = require('../models/roomModels');
const BookingDatabase = require('../database/DatabaseBooking');

// Define the Booking controller object
const BookingController = {
    // Method to create a new booking
    createBooking: async (req, res) => {
        try {
            const body = req.body;
            const RoomId = body.roomId;
            const guestName = body.guestName;
            const checkInDate = body.checkInDate;
            const checkOutDate = body.checkOutDate;
            const room = await Room.findById(RoomId);

            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }
            else {

                const hasbeenbooked = await BookingDatabase.getBookingByroomId(RoomId);

                if (hasbeenbooked) {
                    res.status(200).json({ message: "reserved" });
                }
                else {

                    const newobj = Object.assign({}, {
                        RoomId: RoomId,
                        guestName: guestName,
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                        room: room
                    });

                    const response = await BookingDatabase.createBooking(newobj);

                }

                // const newBooking = await Booking.create(req.body);
                // room.bookings.push(newBooking);
                // await room.save();

                // res.status(200).json(newBooking);

            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = BookingController;