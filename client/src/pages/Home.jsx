import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600')] bg-cover bg-center opacity-20" />
        <div className="relative text-center text-white px-6 max-w-4xl mx-auto">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Bienvenue
          </span>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            L'Excellence<br />
            <span className="text-amber-400">à votre portée</span>
          </h1>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
            Découvrez nos chambres d'exception et vivez une expérience unique au cœur du luxe.
          </p>
          <Link to="/rooms"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-500/30">
            Voir les chambres →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { icon: '🏊', title: 'Spa & Piscine', desc: 'Détente absolue dans notre espace bien-être.' },
            { icon: '🍽️', title: 'Restaurant Gastronomique', desc: 'Une cuisine raffinée signée par nos chefs étoilés.' },
            { icon: '🛎️', title: 'Service 24/7', desc: 'Notre équipe est disponible à toute heure pour vous.' },
          ].map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}