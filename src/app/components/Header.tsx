import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User, LogOut, Calendar, BookOpen, Home, MessageCircle } from 'lucide-react';
import logo from '../../assets/logo.png';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onLoginClick, onSignupClick }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'themes', label: 'Thèmes', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'discover', label: 'Découvrir', icon: BookOpen },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <img 
              src={logo} 
              alt="SecondLife Exchange" 
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl text-gray-900 hidden sm:inline">SecondLife</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(item.id)}
                  className={
                    activeTab === item.id 
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger className="relative h-10 w-10 rounded-full focus:outline-none cursor-pointer">
                  <Avatar className="h-10 w-10 ring-2 ring-emerald-500">
                    <AvatarImage src={user?.photoURL} alt={user?.displayName} />
                    <AvatarFallback className="bg-emerald-500 text-white">
                      {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2" align="end">
                  {/* En-tête avec infos utilisateur */}
                  <div className="px-3 py-3 mb-2 bg-emerald-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                        <AvatarImage src={user?.photoURL} alt={user?.displayName} />
                        <AvatarFallback className="bg-emerald-500 text-white text-lg">
                          {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{user?.displayName}</p>
                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  {/* Statistiques rapides */}
                  <div className="px-3 py-2 mb-2">
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-emerald-50 rounded-lg p-2">
                        <p className="text-xs text-gray-600">Échanges</p>
                        <p className="text-lg font-bold text-emerald-600">{user?.exchangedItems || 0}</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-2">
                        <p className="text-xs text-gray-600">CO₂ économisé</p>
                        <p className="text-lg font-bold text-orange-600">{user?.co2Saved || 0}kg</p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  {/* Bouton Mon profil */}
                  <DropdownMenuItem 
                    onClick={() => {
                      setActiveTab('profile');
                      setIsMenuOpen(false);
                    }}
                    className="cursor-pointer px-3 py-2.5 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    <User className="mr-3 h-5 w-5 text-emerald-600" />
                    <span className="font-medium">Mon profil</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* Bouton déconnexion */}
                  <DropdownMenuItem 
                    onClick={() => {
                      logout();
                      setActiveTab('home');
                      setIsMenuOpen(false);
                    }} 
                    className="cursor-pointer px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    <span className="font-medium">Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={onLoginClick}
                  className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                >
                  Se connecter
                </Button>
                <Button
                  onClick={onSignupClick}
                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  S'inscrire
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <nav className="flex justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(item.id)}
                className={
                  activeTab === item.id 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-gray-700'
                }
              >
                <Icon className="w-4 h-4" />
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};