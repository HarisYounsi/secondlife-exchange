import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { EditItemDialog } from './EditItemDialog';
import { 
  User, 
  Mail, 
  Calendar, 
  TrendingUp, 
  Package, 
  Award,
  MapPin,
  Phone,
  Edit,
  LogOut,
  Leaf,
  Heart,
  Star,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface ProfileProps {
  setActiveTab: (tab: string) => void;
}

interface UserItem {
  id: string;
  title: string;
  description: string;
  condition: string;
  image: string;
  status?: 'available' | 'exchanged';
  createdAt: string;
}

export const Profile: React.FC<ProfileProps> = ({ setActiveTab }) => {
  const { user, logout } = useAuth();
  const [myItems, setMyItems] = useState<UserItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [editingItem, setEditingItem] = useState<UserItem | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      loadMyItems();
    }
  }, [user]);

  const loadMyItems = async () => {
    if (!user?.uid) return;

    try {
      setLoadingItems(true);
      const q = query(
        collection(db, 'items'),
        where('userId', '==', user.uid)
      );

      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as UserItem));

      // Trie par date (plus récent en premier)
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setMyItems(items);
    } catch (error) {
      console.error('Erreur chargement objets:', error);
      toast.error('Erreur lors du chargement de vos objets');
    } finally {
      setLoadingItems(false);
    }
  };

  const handleDeleteItem = async (itemId: string, itemTitle: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${itemTitle}" ?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'items', itemId));
      toast.success('Objet supprimé avec succès');
      loadMyItems(); // Recharge la liste
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleEditItem = (item: UserItem) => {
    setEditingItem(item);
    setShowEditDialog(true);
  };

  const handleEditSuccess = () => {
    loadMyItems(); // Recharge la liste après modification
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Connectez-vous pour voir votre profil</p>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Déconnexion réussie');
      setActiveTab('home');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  // Formatage de la date d'inscription
  const joinedDate = new Date(user.joinedDate).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const conditionLabels = {
    excellent: 'Excellent',
    good: 'Bon',
    fair: 'Correct'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header du profil */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.photoURL} alt={user.displayName} />
            <AvatarFallback className="bg-emerald-500 text-white text-3xl">
              {user.displayName?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>

          {/* Infos principales */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.displayName}</h1>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Membre depuis {joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Bouton déconnexion */}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{user.exchangedItems || 0}</h3>
          <p className="text-gray-600 text-sm">Objets échangés</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{user.co2Saved || 0} kg</h3>
          <p className="text-gray-600 text-sm">CO₂ économisé</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{myItems.length}</h3>
          <p className="text-gray-600 text-sm">Objets publiés</p>
        </div>
      </div>

      {/* Mes objets */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Mes objets</h2>
          </div>
          <Button onClick={() => setActiveTab('themes')} className="bg-emerald-600 hover:bg-emerald-700">
            <Package className="w-4 h-4 mr-2" />
            Ajouter un objet
          </Button>
        </div>

        {loadingItems ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Chargement...</p>
          </div>
        ) : myItems.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 mb-4">Vous n'avez pas encore d'objets</p>
            <Button onClick={() => setActiveTab('themes')} className="bg-emerald-600 hover:bg-emerald-700">
              Ajouter mon premier objet
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myItems.map((item) => (
              <Card key={item.id} className={`${item.status === 'exchanged' ? 'opacity-75' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {item.status === 'exchanged' && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold truncate">{item.title}</h3>
                        {item.status === 'exchanged' ? (
                          <Badge className="bg-emerald-100 text-emerald-800 flex-shrink-0">
                            Échangé
                          </Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800 flex-shrink-0">
                            {conditionLabels[item.condition as keyof typeof conditionLabels]}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {item.description}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          disabled={item.status === 'exchanged'}
                          onClick={() => handleEditItem(item)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Modifier
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteItem(item.id, item.title)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Impact écologique */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Votre impact écologique</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">CO₂ économisé</p>
            <p className="text-2xl font-bold text-emerald-600">{user.co2Saved || 0} kg</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Objets sauvés</p>
            <p className="text-2xl font-bold text-emerald-600">{user.exchangedItems || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Déchets évités</p>
            <p className="text-2xl font-bold text-emerald-600">{((user.exchangedItems || 0) * 1.2).toFixed(1)} kg</p>
          </div>
        </div>
      </div>

      {/* Badges et réalisations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Badges et réalisations</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Badge Premier échange */}
          <div className={`text-center p-4 rounded-lg border-2 ${(user.exchangedItems || 0) >= 1 ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-gray-50 opacity-50'}`}>
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm font-medium">Premier échange</p>
          </div>

          {/* Badge Éco-warrior */}
          <div className={`text-center p-4 rounded-lg border-2 ${(user.exchangedItems || 0) >= 10 ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-gray-50 opacity-50'}`}>
            <div className="text-3xl mb-2">🌱</div>
            <p className="text-sm font-medium">Éco-warrior</p>
            <p className="text-xs text-gray-500">10 échanges</p>
          </div>

          {/* Badge Ambassadeur */}
          <div className={`text-center p-4 rounded-lg border-2 ${(user.exchangedItems || 0) >= 50 ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-gray-50 opacity-50'}`}>
            <div className="text-3xl mb-2">⭐</div>
            <p className="text-sm font-medium">Ambassadeur</p>
            <p className="text-xs text-gray-500">50 échanges</p>
          </div>

          {/* Badge Légende */}
          <div className={`text-center p-4 rounded-lg border-2 ${(user.exchangedItems || 0) >= 100 ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-gray-50 opacity-50'}`}>
            <div className="text-3xl mb-2">👑</div>
            <p className="text-sm font-medium">Légende</p>
            <p className="text-xs text-gray-500">100 échanges</p>
          </div>
        </div>
      </div>

      {/* Modal d'édition */}
      {editingItem && (
        <EditItemDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          item={editingItem}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};