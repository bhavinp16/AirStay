const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    bookingIds: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }
    ],
    wishlistRoomIds: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
    ]
});

module.exports = mongoose.model('User', UserSchema);
