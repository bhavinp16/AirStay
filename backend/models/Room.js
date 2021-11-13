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
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    reviews: [{
        type: String,
    }],
    rating: {
        type: mongoose.Types.Decimal128,
    },
    price: {
        type: {
            adult: mongoose.Types.Decimal128,
            children: mongoose.Types.Decimal128,
        },
        required: true,
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Host',
        required: true,
    },
    images: {
        data: Buffer, 
        contentType: String
    },
    availableDates: [{
        type: Date,
        required: true,
    }],
    capacity: {
        type: {
            adult: Number,
            children: Number,
        },
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    amenties: [{
        type: String,  
    }],
    landmark: {
        type: String,
        required: true,
    },
    houseRules: [{
        type: String,
    }]
})

module.exports = mongoose.model('Room', RoomSchema);