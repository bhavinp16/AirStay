const mongoose = require('mongoose');

const HostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
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
    roomId: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Room'}
    ],
    rating: {
        type: mongoose.Types.Decimal128,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Host', HostSchema);