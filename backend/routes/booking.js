const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Booking = require('../models/Booking');

const router = express.Router();


// @route   POST api/booking/:id
// @desc    Create a booking
// @access  Private
router.get('/:id', auth, [
    check('billingDetails.price', 'Price is required').not().isEmpty(),
    check('billingDetails.duration', 'Duration is required').not().isEmpty(),
    check('billingDetails.dates', 'Date is required').not().isEmpty(),
    check('billingDetails.guests.adult', 'Adult is required').not().isEmpty(),
    check('billingDetails.guests.children', 'Children is required').not().isEmpty(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user._id;
    const roomId = req.params.id;

    const { billingDetails } = req.body;

    try {
        const booking = new Booking({
            userId: userId,
            roomId: roomId,
            billingDetails: billingDetails,
        });

        await booking.save();

        // add the bookingid to user's bookings array
        await User.findByIdAndUpdate(userId, { $push: { bookings: booking._id } });

        // updated rooms availableDates
        await Room.findByIdAndUpdate(roomId, { $pullAll: { availableDates: billingDetails.dates } });

        res.json(booking);

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
        const bookings = await Booking.find({ _id: { $in: bookingsIds } });
        res.json(bookings);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});

module.exports = router;
