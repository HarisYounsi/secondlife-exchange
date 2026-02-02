import { 
  collection, 
  addDoc, 
  doc, 
  getDoc,
  updateDoc, 
  serverTimestamp,
  increment,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { sendMessage } from './conversationService';

export interface Exchange {
  id: string;
  proposerUserId: string;
  recipientUserId: string;
  proposedItem: {
    title: string;
    description: string;
    condition: string;
    image: string;
  };
  requestedItemId: string;
  conversationId: string;
  status: 'pending' | 'accepted' | 'refused';
  refuseReason?: string;
  createdAt: Timestamp;
  acceptedAt?: Timestamp;
}

/**
 * Crée une proposition d'échange avec les données du formulaire
 */
export const createExchangeProposal = async (
  conversationId: string,
  proposerUserId: string,
  recipientUserId: string,
  proposedItemData: {
    title: string;
    description: string;
    condition: string;
    image: string;
  },
  requestedItemId: string
): Promise<string> => {
  try {
    // Vérifie que l'objet demandé existe
    const requestedItemDoc = await getDoc(doc(db, 'items', requestedItemId));
    
    if (!requestedItemDoc.exists()) {
      throw new Error('L\'objet demandé n\'existe pas');
    }
    
    const requestedItem = { id: requestedItemDoc.id, ...requestedItemDoc.data() };
    
    // Crée la proposition d'échange
    const exchangeRef = await addDoc(collection(db, 'exchanges'), {
      proposerUserId,
      recipientUserId,
      proposedItem: proposedItemData,
      requestedItemId,
      conversationId,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    
    // Envoie un message spécial dans la conversation
    await sendMessage(
      conversationId,
      proposerUserId,
      `🔄 Proposition d'échange : ${proposedItemData.title} contre ${(requestedItem as any).title}`,
      'exchange_proposal',
      exchangeRef.id
    );
    
    console.log('Proposition d\'échange créée:', exchangeRef.id);
    return exchangeRef.id;
  } catch (error) {
    console.error('Erreur lors de la création de la proposition:', error);
    throw error;
  }
};

/**
 * Accepte une proposition d'échange
 */
export const acceptExchange = async (
  exchangeId: string
): Promise<void> => {
  try {
    const exchangeDoc = await getDoc(doc(db, 'exchanges', exchangeId));
    
    if (!exchangeDoc.exists()) {
      throw new Error('Échange introuvable');
    }
    
    const exchange = exchangeDoc.data();
    
    // Met à jour le statut de l'échange
    await updateDoc(doc(db, 'exchanges', exchangeId), {
      status: 'accepted',
      acceptedAt: serverTimestamp()
    });
    
    // Met à jour le statut de l'objet demandé (celui qui était sur le site)
    await updateDoc(doc(db, 'items', exchange.requestedItemId), {
      status: 'exchanged',
      exchangeId
    });
    
    // Met à jour les stats des utilisateurs
    await updateDoc(doc(db, 'users', exchange.proposerUserId), {
      exchangedItems: increment(1),
      co2Saved: increment(15)
    });
    
    await updateDoc(doc(db, 'users', exchange.recipientUserId), {
      exchangedItems: increment(1),
      co2Saved: increment(15)
    });
    
    // Envoie un message de confirmation
    await sendMessage(
      exchange.conversationId,
      exchange.recipientUserId,
      '✅ Échange accepté ! L\'objet a été marqué comme échangé.',
      'exchange_accepted',
      exchangeId
    );
    
    console.log('Échange accepté avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'acceptation de l\'échange:', error);
    throw error;
  }
};

/**
 * Refuse une proposition d'échange
 */
export const refuseExchange = async (
  exchangeId: string,
  reason: string
): Promise<void> => {
  try {
    const exchangeDoc = await getDoc(doc(db, 'exchanges', exchangeId));
    
    if (!exchangeDoc.exists()) {
      throw new Error('Échange introuvable');
    }
    
    const exchange = exchangeDoc.data();
    
    // Met à jour le statut de l'échange
    await updateDoc(doc(db, 'exchanges', exchangeId), {
      status: 'refused',
      refuseReason: reason || 'Aucune raison fournie'
    });
    
    // Envoie un message de refus
    const refusalMessage = reason 
      ? `❌ Échange refusé. Raison : ${reason}`
      : '❌ Échange refusé.';
      
    await sendMessage(
      exchange.conversationId,
      exchange.recipientUserId,
      refusalMessage,
      'exchange_refused',
      exchangeId
    );
    
    console.log('Échange refusé');
  } catch (error) {
    console.error('Erreur lors du refus de l\'échange:', error);
    throw error;
  }
};

/**
 * Récupère les détails d'un échange
 */
export const getExchangeDetails = async (exchangeId: string): Promise<Exchange | null> => {
  try {
    const exchangeDoc = await getDoc(doc(db, 'exchanges', exchangeId));
    
    if (!exchangeDoc.exists()) {
      return null;
    }
    
    return {
      id: exchangeDoc.id,
      ...exchangeDoc.data()
    } as Exchange;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'échange:', error);
    return null;
  }
};