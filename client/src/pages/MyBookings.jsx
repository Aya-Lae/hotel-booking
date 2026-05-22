import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/bookings/my').then(r => { setBookings(r.data); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Mes Réservations</h1>
        {loading ? <div className="animate-pulse space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-28 bg-white rounded-2xl" />)}</div>
          : bookings.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl">
              <p className="text-5xl mb-4">🏨</p>
              <p className="text-gray-400 text-lg">Aucune réservation pour l'instant.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map(b => (
                <div key={b._id} className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{b.room?.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {new Date(b.checkIn).toLocaleDateString('fr-FR')} → {new Date(b.checkOut).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-amber-500 font-bold text-xl">{b.totalPrice}€</span>
                    <span className="block text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full mt-1 font-medium">{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}