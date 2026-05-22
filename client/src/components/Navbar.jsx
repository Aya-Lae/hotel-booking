import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight text-gray-900">
          Hôtel<span className="text-amber-500">Luxe</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/rooms" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Chambres
          </Link>
          {user ? (
            <>
              <Link to="/my-bookings" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Mes réservations
              </Link>
              {user.isAdmin && (       // ← ICI dans le bloc connecté
                <Link to="/admin" className="text-sm font-medium text-amber-500 hover:text-amber-600 transition-colors">
                  Admin
                </Link>
              )}
              <button onClick={handleLogout}
                className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Connexion
              </Link>
              <Link to="/register"
                className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors">
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}