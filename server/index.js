const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/admin', require('./routes/admin'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/bookings', require('./routes/bookings'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Hotel Booking API fonctionne !' });
});

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connecté');
    app.listen(process.env.PORT, () => {
      console.log(`Serveur lancé sur le port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log('Erreur MongoDB :', err));