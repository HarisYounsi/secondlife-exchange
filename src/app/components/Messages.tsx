import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { MessageCircle, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserConversations, Conversation } from '../../services/conversationService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ConversationView } from './ConversationView';

interface ConversationWithDetails extends Conversation {
  otherUserName?: string;
  otherUserPhoto?: string;
  itemTitle?: string;
  itemImage?: string;
}

export const Messages: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !user.uid) {
      setLoading(false);
      return;
    }

    // Écoute les conversations en temps réel
    const unsubscribe = getUserConversations(user.uid, async (convs: Conversation[]) => {
      // Enrichit chaque conversation avec les détails de l'autre utilisateur et de l'objet
      const enrichedConversations = await Promise.all(
        convs.map(async (conv) => {
          try {
            // Trouve l'ID de l'autre utilisateur
            const otherUserId = conv.participants.find(id => id !== user.uid);
            
            if (!otherUserId) return conv;

            // Récupère les infos de l'autre utilisateur
            const userDoc = await getDoc(doc(db, 'users', otherUserId));
            const userData = userDoc.exists() ? userDoc.data() : {};

            // Support des anciennes et nouvelles propriétés
            const userName = userData.displayName || userData.name || 'Utilisateur';
            const userPhoto = userData.photoURL || userData.avatar;

            // Récupère les infos de l'objet
            const itemDoc = await getDoc(doc(db, 'items', conv.itemId));
            const itemData = itemDoc.exists() ? itemDoc.data() : {};

            return {
              ...conv,
              otherUserName: userName,
              otherUserPhoto: userPhoto,
              itemTitle: itemData.title || 'Objet',
              itemImage: itemData.images?.[0]
            };
          } catch (error) {
            console.error('Erreur lors de l\'enrichissement:', error);
            return conv;
          }
        })
      );

      setConversations(enrichedConversations);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days === 1) return 'Hier';
    if (days < 7) return `Il y a ${days} jours`;
    
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Connectez-vous</h2>
        <p className="text-gray-600">Pour voir vos messages</p>
      </div>
    );
  }

  // Affiche la vue de conversation si une est sélectionnée
  if (selectedConvId) {
    return (
      <ConversationView 
        conversationId={selectedConvId}
        onBack={() => setSelectedConvId(null)}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500">Chargement des conversations...</p>
        </div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Aucune conversation</h2>
            <p className="text-gray-600 text-center mb-6">
              Commencez à échanger en contactant des utilisateurs depuis leurs objets
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-gray-600">
          {conversations.length} conversation{conversations.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-3">
        {conversations.map((conv) => (
          <Card
            key={conv.id}
            className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-emerald-200"
            onClick={() => setSelectedConvId(conv.id)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Avatar de l'autre utilisateur */}
                <div className="flex-shrink-0">
                  {conv.otherUserPhoto ? (
                    <img
                      src={conv.otherUserPhoto}
                      alt={conv.otherUserName}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-emerald-600 font-semibold text-lg">
                        {conv.otherUserName?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg truncate">
                        {conv.otherUserName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Package className="w-4 h-4" />
                        <span className="truncate">{conv.itemTitle}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formatDate(conv.lastMessageTime)}
                    </span>
                  </div>

                  {/* Dernier message */}
                  {conv.lastMessage && (
                    <p className="text-sm text-gray-600 truncate mt-2">
                      {conv.lastMessage}
                    </p>
                  )}
                </div>

                {/* Image de l'objet */}
                {conv.itemImage && (
                  <div className="flex-shrink-0">
                    <img
                      src={conv.itemImage}
                      alt={conv.itemTitle}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};