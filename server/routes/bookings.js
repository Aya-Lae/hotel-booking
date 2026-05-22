const router = require('express').Router();
const Booking = require('../models/Booking');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, async (req, res) => {
  try {
    const { room, checkIn, checkOut, totalPrice } = req.body;
    const booking = await Booking.create({ user: req.user.id, room, checkIn, checkOut, totalPrice });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/my', protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('room');
  res.json(bookings);
});

router.get('/', protect, admin, async (req, res) => {
  const bookings = await Booking.find().populate('user', 'name email').populate('room', 'name');
  res.json(bookings);
});

module.exports = router;