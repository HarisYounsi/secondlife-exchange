import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, Send, Package, User, Repeat } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { 
  listenToMessages, 
  sendMessage, 
  markMessagesAsRead,
  Message 
} from '../../services/conversationService';
import { 
  createExchangeProposal,
  acceptExchange,
  refuseExchange,
  getExchangeDetails,
  Exchange
} from '../../services/exchangeService';
import { ExchangeProposalDialog } from './ExchangeProposalDialog';
import { ExchangeProposalCard } from './ExchangeProposalCard';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'sonner';

interface ConversationViewProps {
  conversationId: string;
  onBack: () => void;
}

export const ConversationView: React.FC<ConversationViewProps> = ({ 
  conversationId, 
  onBack 
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [otherUserId, setOtherUserId] = useState('');
  const [otherUserName, setOtherUserName] = useState('Utilisateur');
  const [otherUserPhoto, setOtherUserPhoto] = useState<string | undefined>();
  const [itemId, setItemId] = useState('');
  const [itemTitle, setItemTitle] = useState('Objet');
  const [itemImage, setItemImage] = useState<string | undefined>();
  const [itemOwnerId, setItemOwnerId] = useState('');
  const [itemStatus, setItemStatus] = useState<'available' | 'exchanged'>('available');
  const [showExchangeDialog, setShowExchangeDialog] = useState(false);
  const [exchangeDetails, setExchangeDetails] = useState<Record<string, Exchange>>({});
  const [hasPendingProposal, setHasPendingProposal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automatique vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!user) return;

    // Charge les infos de la conversation
    const loadConversationInfo = async () => {
      try {
        const convDoc = await getDoc(doc(db, 'conversations', conversationId));
        
        if (convDoc.exists()) {
          const convData = convDoc.data();
          const otherUserIdTemp = convData.participants.find((id: string) => id !== user.uid);
          
          setOtherUserId(otherUserIdTemp || '');
          setItemId(convData.itemId);
          
          // Charge les infos de l'autre utilisateur
          if (otherUserIdTemp) {
            const userDoc = await getDoc(doc(db, 'users', otherUserIdTemp));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setOtherUserName(userData.displayName || 'Utilisateur');
              setOtherUserPhoto(userData.photoURL);
            }
          }
          
          // Charge les infos de l'objet
          const itemDoc = await getDoc(doc(db, 'items', convData.itemId));
          if (itemDoc.exists()) {
            const itemData = itemDoc.data();
            setItemTitle(itemData.title || 'Objet');
            setItemImage(itemData.images?.[0]);
            setItemOwnerId(itemData.userId || '');
            setItemStatus(itemData.status || 'available');
          }
        }
      } catch (error) {
        console.error('Erreur chargement infos conversation:', error);
      }
    };

    loadConversationInfo();

    // Écoute les messages en temps réel
    const unsubscribe = listenToMessages(conversationId, async (msgs) => {
      setMessages(msgs);
      setLoading(false);
      scrollToBottom();

      // Charge les détails des échanges
      const exchangePromises = msgs
        .filter(m => m.type?.includes('exchange') && m.exchangeId)
        .map(m => getExchangeDetails(m.exchangeId!));

      const exchanges = await Promise.all(exchangePromises);
      const exchangeMap: Record<string, Exchange> = {};
      
      exchanges.forEach(ex => {
        if (ex) exchangeMap[ex.id] = ex;
      });

      setExchangeDetails(exchangeMap);

      // Vérifie s'il y a une proposition en attente
      const hasPending = exchanges.some(ex => ex && ex.status === 'pending');
      setHasPendingProposal(hasPending);
    });

    // Marque les messages comme lus
    if (user?.uid) {
      markMessagesAsRead(conversationId, user.uid);
    }

    return () => unsubscribe();
  }, [conversationId, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user?.uid || sending) return;

    setSending(true);
    
    try {
      await sendMessage(conversationId, user.uid, newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Erreur envoi message:', error);
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleProposeExchange = async (proposedItemData: {
    title: string;
    description: string;
    condition: string;
    image: string;
  }) => {
    if (!user || !otherUserId || !itemId) {
      toast.error('Erreur lors de la proposition');
      return;
    }

    try {
      await createExchangeProposal(
        conversationId,
        user.uid,
        otherUserId,
        proposedItemData,
        itemId
      );

      toast.success('Proposition envoyée !');
    } catch (error) {
      console.error('Erreur proposition échange:', error);
      toast.error('Erreur lors de l\'envoi de la proposition');
      throw error;
    }
  };

  const handleAcceptExchange = async (exchangeId: string) => {
    try {
      await acceptExchange(exchangeId);
      toast.success('🎉 Échange accepté !');
    } catch (error) {
      console.error('Erreur acceptation échange:', error);
      toast.error('Erreur lors de l\'acceptation');
    }
  };

  const handleRefuseExchange = async (exchangeId: string, reason: string) => {
    try {
      await refuseExchange(exchangeId, reason);
      toast.info('Échange refusé');
    } catch (error) {
      console.error('Erreur refus échange:', error);
      toast.error('Erreur lors du refus');
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-4xl mx-auto">
      {/* Header */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            {/* Avatar */}
            <div className="flex-shrink-0">
              {otherUserPhoto ? (
                <img
                  src={otherUserPhoto}
                  alt={otherUserName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-emerald-600" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-lg truncate">{otherUserName}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package className="w-4 h-4" />
                <span className="truncate">{itemTitle}</span>
              </div>
            </div>

            {/* Image objet */}
            {itemImage && (
              <img
                src={itemImage}
                alt={itemTitle}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Chargement...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <Send className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>Aucun message</p>
                <p className="text-sm">Commencez la conversation</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isCurrentUser = message.senderId === (user?.uid || '');
                
                // Si c'est une proposition d'échange
                if (message.type === 'exchange_proposal' && message.exchangeId) {
                  const exchange = exchangeDetails[message.exchangeId];
                  
                  if (exchange) {
                    return (
                      <div key={message.id} className="my-4">
                        <ExchangeProposalCard
                          proposedItem={exchange.proposedItem}
                          requestedItem={{
                            title: itemTitle,
                            image: itemImage
                          }}
                          proposerName={isCurrentUser ? 'Vous' : otherUserName}
                          status={exchange.status}
                          refusalReason={exchange.refuseReason}
                          isReceiver={!isCurrentUser}
                          onAccept={
                            !isCurrentUser && exchange.status === 'pending'
                              ? () => handleAcceptExchange(exchange.id)
                              : undefined
                          }
                          onRefuse={
                            !isCurrentUser && exchange.status === 'pending'
                              ? (reason) => handleRefuseExchange(exchange.id, reason)
                              : undefined
                          }
                        />
                      </div>
                    );
                  }
                }
                
                // Message normal
                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        isCurrentUser
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          isCurrentUser ? 'text-emerald-100' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </CardContent>

        {/* Input + Bouton Proposer */}
        <div className="border-t p-4 space-y-3">
          {/* Bouton Proposer un échange */}
          {/* Masque le bouton si : objet échangé OU utilisateur est le propriétaire */}
          {itemStatus !== 'exchanged' && user?.uid !== itemOwnerId && (
            <Button
              onClick={() => setShowExchangeDialog(true)}
              variant="outline"
              className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={hasPendingProposal}
            >
              <Repeat className="w-4 h-4 mr-2" />
              {hasPendingProposal ? 'Proposition en attente...' : 'Proposer un échange'}
            </Button>
          )}

          {/* Message si objet échangé */}
          {itemStatus === 'exchanged' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
              <p className="text-sm text-emerald-700 font-medium">
                ✅ Cet objet a déjà été échangé
              </p>
            </div>
          )}

          {/* Message si c'est son propre objet */}
          {user?.uid === itemOwnerId && itemStatus !== 'exchanged' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <p className="text-sm text-blue-700 font-medium">
                💡 Ceci est votre objet
              </p>
            </div>
          )}

          {/* Input message */}
          <div className="flex gap-2">
            <Input
              placeholder="Écrivez votre message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={sending}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            💡 Appuyez sur Entrée pour envoyer
          </p>
        </div>
      </Card>

      {/* Dialog Proposer un échange */}
      <ExchangeProposalDialog
        open={showExchangeDialog}
        onOpenChange={setShowExchangeDialog}
        onSubmit={handleProposeExchange}
        itemTitle={itemTitle}
      />
    </div>
  );
};