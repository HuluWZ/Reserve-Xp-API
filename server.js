const express = require('express')
const mongoose = require('mongoose')
const Booking = require('./models/bookingModels');
const bodyParser = require('body-parser');
const morgan = require("morgan") //import morgan
const { log } = require("mercedlogger") // import mercedlogger's log function
// const UserRouter = require("./controllers/users") //import User Routes

require('./database/connection')
const Tenant = require('./tenant/tenant')
const {tenantDb , centralDb} = require('./middleware/db')
const { getSlug, auth , centralAuth} = require('./middleware/auth')

require("dotenv").config() // load .env variables
const cors = require('cors');
const app = express();

app.use(cors());
app.use(morgan("tiny"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.getMaxListeners('/', (req, res) => {
    res.send("SAAS Node API")

})


const flightRoutes = require('./routes/flight');
const spaceRoutes = require('./routes/space');
const tourRoutes = require('./routes/tour');
const carRoutes = require('./routes/car');
const boatRoutes = require('./routes/boat');
const hotelRoutes = require('./routes/hotel');
const roomRoutes = require('./routes/room');

const superRoutes = require('./routes/superadmin');
const tenantRoutes = require('./routes/tenantRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const userRoutes = require('./routes/userRoutes')


const locationRoutes = require('./routes/locationRoutes')

app.use("/api/tenant/", centralAuth, tenantRoutes);
app.use("/api/superadmin/", centralDb, superRoutes);
app.use("/api/vendor/", getSlug,auth, tenantDb, vendorRoutes);
app.use("/api/user/",getSlug, auth, tenantDb, userRoutes);
app.use("/api/location/", getSlug,auth, tenantDb, locationRoutes);
app.use("/api/hotel/",getSlug, auth, tenantDb, hotelRoutes);


app.use('/:slug/',auth,tenantDb,flightRoutes);
app.use('/:slug/',auth,tenantDb, spaceRoutes);
app.use('/:slug/',auth,tenantDb, tourRoutes);
app.use('/:slug/',auth,tenantDb,carRoutes);
app.use('/:slug/',auth,tenantDb, boatRoutes);
app.use('/:slug/',auth,tenantDb,roomRoutes);




// GET all hotels
app.listen(process.env.PORT, () => {
    console.log(` SAAS API  is running on Port ${process.env.PORT}`);
});



// GET all bookings
app.get("/:slug/bookings", auth,tenantDb,async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.status(200).json(bookings);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// GET a single booking by ID
app.get("/:slug/bookings/:id", auth,tenantDb,async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// CREATE a new booking
app.post("/:slug/bookings",auth,tenantDb, async (req, res) => {
    try {
        const newBooking = await Booking.create(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a booking by ID
app.put("/:slug/bookings/:id",auth,tenantDb, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// DELETE a booking by ID
app.delete("/:slug/bookings/:id", auth,tenantDb, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});



