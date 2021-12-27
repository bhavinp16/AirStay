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
            adult: Number,
            children: Number,
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
    images: [{
        type: String,
    }],
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
            Longitude: Number,
            Latitude: Number,
        },
        required: true,
    },
    reviews: [{
        type: {
            user: {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                name: String,
                joinDate: Date,
            },
            review: String,
            reviewDate: Date,
        }
    }],
    rating: {
        type: Number,
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },

})

module.exports = mongoose.model('Room', RoomSchema);