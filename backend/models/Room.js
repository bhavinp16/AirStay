const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    roomType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    capacity: {
        type: {
            adult: Number,
            children: Number,
        },
        required: true,
    },
    price: {
        type: {
            adult: mongoose.Types.Decimal128,
            children: mongoose.Types.Decimal128,
        },
        required: true,
    },
    availableDates: [{
        type: Date,
        required: true,
    }],
    houseRules: {
        type: String,
    },
    amenties: {
        type: String,
    },
    images: {
        data: Buffer,
        contentType: String
    },
    address: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    coordinates: {
        type: {
            Longitude: mongoose.Types.Decimal128,
            Latitude: mongoose.Types.Decimal128,
        },
        required: true,
    },
    reviews: [{
        type: String,
    }],
    rating: {
        type: mongoose.Types.Decimal128,
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },

})

module.exports = mongoose.model('Room', RoomSchema);