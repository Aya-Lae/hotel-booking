const router = require('express').Router();
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

// Stats dashboard
router.get('/stats', protect, admin, async (req, res) => {
  const [rooms, bookings, users] = await Promise.all([
    Room.countDocuments(),
    Booking.countDocuments(),
    User.countDocuments(),
  ]);
  const revenue = await Booking.aggregate([
    { $group: { _id: null, total: { $sum: '$totalPrice' } } }
  ]);
  res.json({
    rooms,
    bookings,
    users,
    revenue: revenue[0]?.total || 0,
  });
});

// Toutes les réservations (détaillées)
router.get('/bookings', protect, admin, async (req, res) => {
  const bookings = await Booking.find()
    .populate('user', 'name email')
    .populate('room', 'name type price')
    .sort({ createdAt: -1 });
  res.json(bookings);
});

// Changer le statut d'une réservation
router.put('/bookings/:id', protect, admin, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(booking);
});

module.exports = router;