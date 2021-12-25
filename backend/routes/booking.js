const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Room = require('../models/Room');

const router = express.Router();


// @route   POST api/booking/:id
// @desc    Create a booking
// @access  Private
router.post('/:id', auth, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const roomId = req.params.id;

    const { billingDetails } = req.body;

    // convert billingDetails.dates to Date type
    const dates = billingDetails.date.map(date => new Date(date));

    try {
        const booking = new Booking({
            userId: userId,
            roomId: roomId,
            billingDetails: {
                price: billingDetails.price,
                duration: billingDetails.duration,
                dates: dates,
                guests: {
                    adult: billingDetails.adult,
                    children: billingDetails.children,
                }
            },
        });

        await booking.save();

        // add the bookingid to user's bookings array
        await User.findByIdAndUpdate(userId, { $push: { bookings: booking.id } });

        // updated rooms availableDates
        await Room.findByIdAndUpdate(roomId, { $pullAll: { availableDates: billingDetails.dates } });

        res.status(200).json({
            message: 'Room booked successfully',
            booking: booking
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});



// @route   GET api/booking
// @desc    Get all bookings by a user
// @access  Private
router.get('/', auth, async (req, res) => {
    const user = req.user;
    const bookingsIds = user.bookingIds;
    try {
        const bookings = await Booking.find({ id: { $in: bookingsIds } });
        res.json(bookings);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});

module.exports = router;
