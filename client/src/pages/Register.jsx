import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', form);
      login(data.user, data.token);
      navigate('/rooms');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur d\'inscription');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Créer un compte</h2>
        <p className="text-gray-400 mb-8">Rejoignez HôtelLuxe dès aujourd'hui.</p>
        {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[['name', 'Nom complet', 'text'], ['email', 'Email', 'email'], ['password', 'Mot de passe', 'password']].map(([key, label, type]) => (
            <div key={key}>
              <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
              <input type={type} required value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
          ))}
          <button type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 rounded-xl transition-colors mt-2">
            Créer mon compte
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          Déjà un compte ? <Link to="/login" className="text-amber-500 font-medium hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}