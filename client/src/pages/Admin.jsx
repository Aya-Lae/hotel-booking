import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const STATUS_COLORS = {
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
  pending: 'bg-yellow-100 text-yellow-700',
};

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ name: '', type: 'Double', price: '', description: '', image: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!user?.isAdmin) navigate('/');
  }, [user]);

  useEffect(() => {
    if (tab === 'dashboard') api.get('/admin/stats').then(r => setStats(r.data));
    if (tab === 'bookings') api.get('/admin/bookings').then(r => setBookings(r.data));
    if (tab === 'rooms') api.get('/rooms').then(r => setRooms(r.data));
  }, [tab]);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await api.post('/rooms', { ...newRoom, price: Number(newRoom.price) });
      setMsg('✅ Chambre ajoutée !');
      setNewRoom({ name: '', type: 'Double', price: '', description: '', image: '' });
      api.get('/rooms').then(r => setRooms(r.data));
    } catch { setMsg('❌ Erreur lors de l\'ajout'); }
  };

  const handleDeleteRoom = async (id) => {
    if (!confirm('Supprimer cette chambre ?')) return;
    await api.delete(`/rooms/${id}`);
    setRooms(rooms.filter(r => r._id !== id));
  };

  const handleStatusChange = async (id, status) => {
    await api.put(`/admin/bookings/${id}`, { status });
    setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
  };

  const TABS = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'rooms', label: '🏨 Chambres' },
    { id: 'bookings', label: '📋 Réservations' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel Admin</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-2xl p-1.5 shadow-sm w-fit">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === t.id ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {tab === 'dashboard' && stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Chambres', value: stats.rooms, icon: '🏨', color: 'from-blue-500 to-blue-600' },
              { label: 'Réservations', value: stats.bookings, icon: '📋', color: 'from-amber-500 to-amber-600' },
              { label: 'Utilisateurs', value: stats.users, icon: '👤', color: 'from-purple-500 to-purple-600' },
              { label: 'Revenus', value: `${stats.revenue}€`, icon: '💰', color: 'from-green-500 to-green-600' },
            ].map(s => (
              <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-2xl p-6 text-white`}>
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-white/70 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Gestion Chambres */}
        {tab === 'rooms' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulaire ajout */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Ajouter une chambre</h2>
              {msg && <div className="mb-4 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-xl">{msg}</div>}
              <form onSubmit={handleAddRoom} className="space-y-4">
                {[
                  ['name', 'Nom', 'text'],
                  ['price', 'Prix (€/nuit)', 'number'],
                  ['image', 'URL Image', 'text'],
                ].map(([key, label, type]) => (
                  <div key={key}>
                    <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
                    <input type={type} required={key !== 'image'} value={newRoom[key]}
                      onChange={e => setNewRoom({...newRoom, [key]: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Type</label>
                  <select value={newRoom.type} onChange={e => setNewRoom({...newRoom, type: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                    {['Simple', 'Double', 'Suite', 'Deluxe'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
                  <textarea rows={3} value={newRoom.description}
                    onChange={e => setNewRoom({...newRoom, description: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition-colors">
                  Ajouter la chambre
                </button>
              </form>
            </div>

            {/* Liste chambres */}
            <div className="space-y-4">
              {rooms.map(r => (
                <div key={r._id} className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                      {r.image ? <img src={r.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl">🏨</div>}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{r.name}</p>
                      <p className="text-sm text-gray-400">{r.type} · {r.price}€/nuit</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteRoom(r._id)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors text-lg">
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Réservations */}
        {tab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Client', 'Chambre', 'Arrivée', 'Départ', 'Total', 'Statut'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map(b => (
                  <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{b.user?.name}</p>
                      <p className="text-gray-400 text-xs">{b.user?.email}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{b.room?.name}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(b.checkIn).toLocaleDateString('fr-FR')}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(b.checkOut).toLocaleDateString('fr-FR')}</td>
                    <td className="px-6 py-4 font-semibold text-amber-500">{b.totalPrice}€</td>
                    <td className="px-6 py-4">
                      <select value={b.status}
                        onChange={e => handleStatusChange(b._id, e.target.value)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 ${STATUS_COLORS[b.status] || 'bg-gray-100 text-gray-600'}`}>
                        <option value="confirmed">confirmed</option>
                        <option value="pending">pending</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="text-center py-16 text-gray-400">Aucune réservation.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}