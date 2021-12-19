const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Room = require('../models/Room');
const User = require('../models/User');

const router = express.Router();

// @route   GET api/room/:city
// @desc    Get rooms list by city
// @access  Private
router.get('/:city', auth, async (req, res) => {
    try {
        const rooms = await Room.find({ city: req.params.city });
        res.json(rooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});


// @route   GET api/room/:id
// @desc    Get room detail by roomid
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        res.json(room);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});


// @route   GET api/room/wishlist
// @desc    Get rooms list in users wishlist
// @access  Private
router.get('/wishlist', auth, async (req, res) => {
    const user = req.user;
    const roomIds = user.wishlistRoomIds;
    try {
        const rooms = await Room.find({ _id: { $in: roomIds } });
        res.json(rooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});


// @route   GET api/room/curratedlist
// @desc    Get top 10 rooms list by ratings
// @access  Private
router.get('/curratedlist', auth, async (req, res) => {
    try {
        const rooms = await Room.find().sort({ rating: -1 }).limit(10);
        res.json(rooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});



///////////////////////////////////// TO DO Images upload ///////////////////////////////////
// @route   POST api/room
// @desc    Create A Room
// @access  Private
router.post(
    '/',
    auth,
    [
        check('city', 'City is required').exists(),
        check('title', 'Please include a title').exists(),
        check('coordinates', 'Coordinates are required please relocate the pin').exists(),
        check('address', 'Address is required').exists(),
        check('price', 'Price is required').exists(),
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const hostId = req.user._id; //From auth middleware decoded from token 

        const { title, roomType, description, capacity, price, availableDates, houseRules, amenties, images, address, landmark, city, state, coordinates } = req.body;

        try {
            const newRoom = new Room({
                hostId,
                title,
                roomType,
                description,
                capacity,
                price,
                availableDates,
                houseRules,
                amenties,
                images,
                address,
                landmark,
                city,
                state,
                coordinates
            });

            const room = await newRoom.save();
            res.json(room);

        } catch {
            console.error(err.message);
            res.status(500).send('Server Error!');
        }
    }
);




// WISHLIST

// @route   POST api/room/wishlist
// @desc    Add room to users wishlist
// @access  Private
router.post('/wishlist', auth, async (req, res) => {
    const user = req.user;
    try {
        const room = await Room.findById(req.body.roomId);
        if (!room) {
            return res.status(404).json({ msg: 'Room not found' });
        }

        await User.findByIdAndUpdate(user._id, { $push: { wishlistRoomIds: room.id } });

        res.json(rooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});

// @route   DELETE api/room/wishlist
// @desc    Remove room from users wishlist
// @access  Private
router.delete('/wishlist', auth, async (req, res) => {
    const user = req.user;
    try {
        const room = await Room.findById(req.body.roomId);
        if (!room) {
            return res.status(404).json({ msg: 'Room not found' });
        }

        await User.findByIdAndUpdate(user._id, { $pull: { wishlistRoomIds: room.id } });

        res.json(rooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});




module.exports = router;
