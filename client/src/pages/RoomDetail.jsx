import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function RoomDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get(`/rooms/${id}`).then(r => setRoom(r.data));
  }, [id]);

  const calcTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    return nights > 0 ? nights * room.price : 0;
  };

  const handleBook = async () => {
    if (!user) return navigate('/login');
    if (!checkIn || !checkOut || calcTotal() <= 0) return setMsg('Dates invalides');
    try {
      await api.post('/bookings', { room: id, checkIn, checkOut, totalPrice: calcTotal() });
      setMsg('✅ Réservation confirmée !');
    } catch { setMsg('❌ Erreur lors de la réservation'); }
  };

  if (!room) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <div className="rounded-2xl overflow-hidden h-80 bg-gray-200">
            {room.image ? <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-6xl">🏨</div>}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">{room.name}</h1>
          <span className="text-gray-400 uppercase text-sm tracking-wide">{room.type}</span>
          <p className="text-gray-600 mt-4 leading-relaxed">{room.description || 'Aucune description.'}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm self-start">
          <div className="flex items-end gap-2 mb-8">
            <span className="text-4xl font-bold text-amber-500">{room.price}€</span>
            <span className="text-gray-400 mb-1">/ nuit</span>
          </div>
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Arrivée</label>
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Départ</label>
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
          </div>
          {calcTotal() > 0 && (
            <div className="bg-amber-50 rounded-xl px-4 py-3 mb-4 text-sm font-medium text-amber-700">
              Total : {calcTotal()}€
            </div>
          )}
          <button onClick={handleBook}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 rounded-xl transition-colors">
            {user ? 'Réserver maintenant' : 'Se connecter pour réserver'}
          </button>
          {msg && <p className="text-center text-sm mt-4 text-gray-600">{msg}</p>}
        </div>
      </div>
    </div>
  );
}