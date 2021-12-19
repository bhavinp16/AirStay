const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    billingDetails: {
        type: {
            price: mongoose.Types.Decimal128,
            duration: String,
            dates: [{
                type: Date,
            }],
            guests: {
                type: {
                    adult: Number,
                    children: Number,
                },
                required: true,
            }
        },
        required: true,
    },

})

module.exports = mongoose.model('Booking', BookingSchema);
