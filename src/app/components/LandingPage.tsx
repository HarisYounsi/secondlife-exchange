import React from 'react';

interface LandingPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onSignup }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec boutons connexion/inscription */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">♻️</span>
            </div>
            <span className="text-xl font-bold">SecondLife</span>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={onLogin}
              className="px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Se connecter
            </button>
            <button
              onClick={onSignup}
              className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 font-medium"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-12 text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm mb-6">
              Économie Circulaire
            </span>
            <h1 className="text-5xl font-bold mb-6">
              Échangez, Partagez, Préservez
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Rejoignez notre communauté et participez à un mouvement pour une consommation plus responsable. 
              Chaque semaine, un nouveau thème d'échange pour donner une seconde vie à vos objets.
            </p>
            <button
              onClick={onSignup}
              className="px-8 py-4 bg-white text-emerald-600 rounded-lg hover:bg-gray-50 font-medium text-lg inline-flex items-center gap-2"
            >
              Découvrir le thème de la semaine
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600 mb-2">Objets échangés</p>
            <p className="text-4xl font-bold text-gray-900 mb-2">12,547</p>
            <span className="text-emerald-500 text-2xl">📈</span>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600 mb-2">Membres actifs</p>
            <p className="text-4xl font-bold text-gray-900 mb-2">3,241</p>
            <span className="text-blue-500 text-2xl">👥</span>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600 mb-2">Thèmes disponibles</p>
            <p className="text-4xl font-bold text-gray-900 mb-2">52</p>
            <span className="text-purple-500 text-2xl">📅</span>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-600 mb-2">CO₂ économisé</p>
            <p className="text-4xl font-bold text-gray-900 mb-2">8.5T</p>
            <span className="text-green-500 text-2xl">🌱</span>
          </div>
        </div>
      </div>
    </div>
  );
};