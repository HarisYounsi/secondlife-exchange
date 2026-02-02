import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Themes } from './components/Themes';
import { Profile } from './components/Profile';
import { Messages } from './components/Messages';
import { Discover } from './components/Discover';
import { MentionsLegales } from './components/legal/MentionsLegales';
import { CGU } from './components/legal/CGU';
import { PolitiqueConfidentialite } from './components/legal/PolitiqueConfidentialite';
import { GestionCookies } from './components/legal/GestionCookies';
import { Toaster } from './components/ui/sonner';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState<'login' | 'signup' | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [legalPage, setLegalPage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (showAuthModal === 'login') {
    return (
      <Login 
        onSwitchToSignup={() => setShowAuthModal('signup')}
        onClose={() => setShowAuthModal(null)}
      />
    );
  }

  if (showAuthModal === 'signup') {
    return (
      <Signup 
        onSwitchToLogin={() => setShowAuthModal('login')}
        onClose={() => setShowAuthModal(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        activeTab={legalPage ? 'legal' : activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setLegalPage(null);
        }}
        onLoginClick={() => setShowAuthModal('login')}
        onSignupClick={() => setShowAuthModal('signup')}
      />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {legalPage === 'mentions' && <MentionsLegales />}
        {legalPage === 'cgu' && <CGU />}
        {legalPage === 'confidentialite' && <PolitiqueConfidentialite />}
        {legalPage === 'cookies' && <GestionCookies />}
        
        {!legalPage && (
          <>
            {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
            {activeTab === 'themes' && <Themes setActiveTab={setActiveTab} />}
            {activeTab === 'messages' && (user ? <Messages /> : <div className="text-center py-12">Connectez-vous pour voir vos messages</div>)}
            {activeTab === 'profile' && (user ? <Profile setActiveTab={setActiveTab} /> : <div className="text-center py-12">Connectez-vous pour voir votre profil</div>)}
            {activeTab === 'discover' && <Discover />}
          </>
        )}
      </main>
      <Footer onLegalClick={setLegalPage} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  );
}