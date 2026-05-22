import { useEffect, useState } from 'react';
import api from '../api/axios';
import RoomCard from '../components/RoomCard';

const TYPES = ['Tous', 'Simple', 'Double', 'Suite', 'Deluxe'];

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Tous');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/rooms').then(r => { setRooms(r.data); setLoading(false); });
  }, []);

  const filtered = rooms.filter(r => {
    const matchType = filter === 'Tous' || r.type === filter;
    const matchPrice = r.price <= maxPrice;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchPrice && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Nos Chambres</h1>
          <p className="text-gray-500 text-lg">Choisissez l'expérience qui vous correspond</p>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-10 flex flex-wrap gap-6 items-end">
          {/* Recherche */}
          <div className="flex-1 min-w-48">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Recherche</label>
            <input
              type="text"
              placeholder="Nom de la chambre..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Type */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Type</label>
            <div className="flex gap-2 flex-wrap">
              {TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === t
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Prix max */}
          <div className="flex-1 min-w-48">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
              Prix max : <span className="text-amber-500">{maxPrice}€</span>
            </label>
            <input
              type="range" min="50" max="1000" step="50"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>
        </div>

        {/* Résultats */}
        <p className="text-sm text-gray-400 mb-6">{filtered.length} chambre(s) trouvée(s)</p>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-400 text-lg">Aucune chambre ne correspond à vos critères.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filtered.map(room => <RoomCard key={room._id} room={room} />)}
          </div>
        )}
      </div>
    </div>
  );
}