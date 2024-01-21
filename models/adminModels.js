const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "SuperAdmin"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Admin = mongoose.model('SuperAdmin', adminSchema,"SuperAdmin");

module.exports = Admin;