import { useEffect, useState } from 'react';
import api from '../api/axios';
import RoomCard from '../components/RoomCard';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/rooms').then(r => { setRooms(r.data); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Nos Chambres</h1>
          <p className="text-gray-500 text-lg">Choisissez l'expérience qui vous correspond</p>
        </div>
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">Aucune chambre disponible pour l'instant.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map(room => <RoomCard key={room._id} room={room} />)}
          </div>
        )}
      </div>
    </div>
  );
}