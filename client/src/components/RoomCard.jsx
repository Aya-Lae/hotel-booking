import { Link } from 'react-router-dom';

export default function RoomCard({ room }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
      <div className="relative h-52 bg-gray-200 overflow-hidden">
        {room.image ? (
          <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-5xl">🏨</span>
          </div>
        )}
        <span className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
          room.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
        }`}>
          {room.isAvailable ? 'Disponible' : 'Occupée'}
        </span>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 text-lg">{room.name}</h3>
          <span className="text-amber-500 font-bold text-lg">{room.price}€<span className="text-sm font-normal text-gray-400">/nuit</span></span>
        </div>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{room.type}</span>
        <p className="text-gray-500 text-sm mt-2 mb-4 line-clamp-2">{room.description}</p>
        <Link to={`/rooms/${room._id}`}
          className="block w-full text-center bg-gray-900 hover:bg-amber-500 text-white text-sm font-semibold py-3 rounded-xl transition-colors">
          Voir & Réserver
        </Link>
      </div>
    </div>
  );
}