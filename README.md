# 🏨 HôtelLuxe — Application de Réservation d'Hôtel

Une application web fullstack de réservation d'hôtel construite avec la stack **MERN** (MongoDB, Express, React, Node.js) et un design moderne avec **Tailwind CSS**.

---

## ✨ Fonctionnalités

### Côté utilisateur
- 🔐 Inscription & connexion avec authentification JWT
- 🛏️ Parcourir les chambres avec filtres (type, prix, recherche)
- 📄 Voir le détail d'une chambre
- 📅 Réserver une chambre avec sélection des dates
- 💰 Calcul automatique du prix total
- 📋 Consulter ses réservations

### Côté admin
- 📊 Dashboard avec statistiques (chambres, réservations, users, revenus)
- ➕ Ajouter / supprimer des chambres
- 🗂️ Gérer les statuts des réservations (confirmed / pending / cancelled)

---

## 🛠️ Stack technique

| Couche | Technologie |
|--------|------------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Backend | Node.js + Express |
| Base de données | MongoDB Atlas + Mongoose |
| Authentification | JWT + bcryptjs |

---

## 📁 Structure du projet

```
hotel-booking/
├── client/                  # Frontend React + Vite
│   └── src/
│       ├── api/
│       │   └── axios.js         # Instance Axios + intercepteur JWT
│       ├── context/
│       │   └── AuthContext.jsx  # Gestion état auth global
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Rooms.jsx        # Liste + filtres
│       │   ├── RoomDetail.jsx   # Détail + réservation
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── MyBookings.jsx
│       │   └── Admin.jsx        # Panel admin complet
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── RoomCard.jsx
│       └── App.jsx
│
└── server/                  # Backend Node.js + Express
    ├── models/
    │   ├── User.js
    │   ├── Room.js
    │   └── Booking.js
    ├── routes/
    │   ├── auth.js
    │   ├── rooms.js
    │   ├── bookings.js
    │   └── admin.js
    ├── middleware/
    │   └── auth.js          # protect + admin middleware
    └── index.js
```

---

## 🚀 Installation & lancement

### Prérequis
- Node.js v18+
- Compte MongoDB Atlas (cluster gratuit M0)

### 1. Cloner le projet

```bash
git clone https://github.com/ton-user/hotel-booking.git
cd hotel-booking
```

### 2. Configurer le backend

```bash
cd server
npm install
```

Créer un fichier `.env` :

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/hotelbooking?retryWrites=true&w=majority
JWT_SECRET=hotelbooking_secret_2024
```

### 3. Configurer le frontend

```bash
cd client
npm install
```

### 4. Lancer l'application

Terminal 1 — Backend :
```bash
cd server
npm run dev
```

Terminal 2 — Frontend :
```bash
cd client
npm run dev
```

L'application est accessible sur `http://localhost:5173`

---

## 🔑 Passer un utilisateur en admin

Après avoir créé un compte, exécuter dans le dossier `server` :

```bash
node -e "
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const User = require('./models/User');
  await User.updateMany({}, { isAdmin: true });
  console.log('Done');
  process.exit();
});
"
```

Puis se déconnecter et se reconnecter pour obtenir un nouveau token.

---

## 📡 API Endpoints

### Auth
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/auth/register` | Créer un compte |
| POST | `/api/auth/login` | Se connecter |

### Rooms
| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/api/rooms` | Liste des chambres | — |
| GET | `/api/rooms/:id` | Détail d'une chambre | — |
| POST | `/api/rooms` | Ajouter une chambre | Admin |
| PUT | `/api/rooms/:id` | Modifier une chambre | Admin |
| DELETE | `/api/rooms/:id` | Supprimer une chambre | Admin |

### Bookings
| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| POST | `/api/bookings` | Créer une réservation | User |
| GET | `/api/bookings/my` | Mes réservations | User |
| GET | `/api/bookings` | Toutes les réservations | Admin |

### Admin
| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/api/admin/stats` | Statistiques dashboard | Admin |
| GET | `/api/admin/bookings` | Réservations détaillées | Admin |
| PUT | `/api/admin/bookings/:id` | Changer statut réservation | Admin |

---

## 🔮 Améliorations futures

- [ ] Upload d'images avec **Cloudinary**
- [ ] Paiement en ligne avec **Stripe**
- [ ] Vérification de disponibilité des chambres
- [ ] Système de notation et avis
- [ ] Emails de confirmation avec **Nodemailer**
- [ ] Déploiement : **Render** (backend) + **Vercel** (frontend)
- [ ] Mode sombre
- [ ] Internationalisation (FR / EN / AR)
- [ ] Dashboard admin avec graphiques (Chart.js)

---

## 👤 Auteur

Développé par **Aya** — Projet fullstack MERN

---

## 📄 Licence

MIT