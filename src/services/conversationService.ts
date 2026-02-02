import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  onSnapshot,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: Timestamp;
  read: boolean;
  type?: 'text' | 'exchange_proposal' | 'exchange_accepted' | 'exchange_refused';
  exchangeId?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  itemId: string;
  lastMessage: string;
  lastMessageTime: Timestamp;
  updatedAt: Timestamp;
  createdAt: Timestamp;
}

/**
 * Récupère ou crée une conversation entre 2 utilisateurs pour un objet spécifique
 */
export const getOrCreateConversation = async (
  currentUserId: string,
  otherUserId: string,
  itemId: string
): Promise<string> => {
  try {
    // Cherche si une conversation existe déjà entre ces 2 users pour cet objet
    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', currentUserId)
    );
    
    const snapshot = await getDocs(q);
    
    // Vérifie si l'autre utilisateur est dans les participants ET si c'est pour le même objet
    const existing = snapshot.docs.find(docSnap => {
      const data = docSnap.data();
      return data.participants.includes(otherUserId) && data.itemId === itemId;
    });
    
    if (existing) {
      console.log('Conversation existante trouvée:', existing.id);
      return existing.id;
    }
    
    // Crée une nouvelle conversation
    console.log('Création d\'une nouvelle conversation');
    const newConv = await addDoc(collection(db, 'conversations'), {
      participants: [currentUserId, otherUserId],
      itemId,
      lastMessage: '',
      lastMessageTime: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return newConv.id;
  } catch (error) {
    console.error('Erreur lors de la récupération/création de conversation:', error);
    throw error;
  }
};

/**
 * Récupère toutes les conversations d'un utilisateur
 */
export const getUserConversations = (
  userId: string,
  callback: (conversations: Conversation[]) => void
) => {
  const q = query(
    collection(db, 'conversations'),
    where('participants', 'array-contains', userId),
    orderBy('updatedAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const conversations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Conversation));
    
    callback(conversations);
  });
};

/**
 * Envoie un message dans une conversation
 */
export const sendMessage = async (
  conversationId: string,
  senderId: string,
  text: string,
  type: 'text' | 'exchange_proposal' | 'exchange_accepted' | 'exchange_refused' = 'text',
  exchangeId?: string
): Promise<void> => {
  try {
    // Prépare les données du message
    const messageData: any = {
      senderId,
      text,
      type,
      createdAt: serverTimestamp(),
      read: false
    };
    
    // Ajoute exchangeId seulement s'il existe
    if (exchangeId) {
      messageData.exchangeId = exchangeId;
    }
    
    // Ajoute le message
    await addDoc(
      collection(db, 'messages', conversationId, 'messages'),
      messageData
    );
    
    // Met à jour la conversation
    await updateDoc(doc(db, 'conversations', conversationId), {
      lastMessage: text,
      lastMessageTime: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log('Message envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    throw error;
  }
};

/**
 * Écoute les messages d'une conversation en temps réel
 */
export const listenToMessages = (
  conversationId: string,
  callback: (messages: Message[]) => void
) => {
  const q = query(
    collection(db, 'messages', conversationId, 'messages'),
    orderBy('createdAt', 'asc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Message));
    
    callback(messages);
  });
};

/**
 * Marque les messages d'une conversation comme lus
 */
export const markMessagesAsRead = async (
  conversationId: string,
  currentUserId: string
): Promise<void> => {
  try {
    const q = query(
      collection(db, 'messages', conversationId, 'messages'),
      where('senderId', '!=', currentUserId),
      where('read', '==', false)
    );
    
    const snapshot = await getDocs(q);
    
    const updates = snapshot.docs.map(docSnap =>
      updateDoc(doc(db, 'messages', conversationId, 'messages', docSnap.id), {
        read: true
      })
    );
    
    await Promise.all(updates);
  } catch (error) {
    console.error('Erreur lors du marquage des messages comme lus:', error);
  }
};

/**
 * Compte le nombre de messages non lus pour un utilisateur
 */
export const getUnreadCount = async (userId: string): Promise<number> => {
  try {
    // Récupère toutes les conversations de l'utilisateur
    const convQuery = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', userId)
    );
    
    const convSnapshot = await getDocs(convQuery);
    let totalUnread = 0;
    
    // Pour chaque conversation, compte les messages non lus
    for (const convDoc of convSnapshot.docs) {
      const messagesQuery = query(
        collection(db, 'messages', convDoc.id, 'messages'),
        where('senderId', '!=', userId),
        where('read', '==', false)
      );
      
      const messagesSnapshot = await getDocs(messagesQuery);
      totalUnread += messagesSnapshot.size;
    }
    
    return totalUnread;
  } catch (error) {
    console.error('Erreur lors du comptage des messages non lus:', error);
    return 0;
  }
};