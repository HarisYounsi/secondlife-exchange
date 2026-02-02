import { collection, addDoc, getDocs, query, where, orderBy, Timestamp, updateDoc, doc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Item } from '../app/data/items';

const ITEMS_COLLECTION = 'items';

export const addItemToFirestore = async (item: Omit<Item, 'id' | 'createdAt' | 'votes'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, ITEMS_COLLECTION), {
      ...item,
      createdAt: Timestamp.now(),
      votes: 0
    });
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'objet:', error);
    throw error;
  }
};

export const getAllItems = async (): Promise<Item[]> => {
  try {
    // Requête simple sans orderBy (pas besoin d'index)
    const q = query(collection(db, ITEMS_COLLECTION));
    const querySnapshot = await getDocs(q);
    
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
    } as Item));
    
    // Tri côté client par date décroissante
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return items;
  } catch (error) {
    console.error('Erreur lors de la récupération des objets:', error);
    return [];
  }
};

export const getItemsByTheme = async (themeId: string): Promise<Item[]> => {
  try {
    console.log('🔍 Recherche objets pour thème:', themeId);
    
    // Requête simple sans orderBy (pas besoin d'index)
    const q = query(
      collection(db, ITEMS_COLLECTION),
      where('themeId', '==', themeId)
    );
    
    const querySnapshot = await getDocs(q);
    
    const items = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('📦 Objet trouvé:', doc.id, 'themeId:', data.themeId);
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString()
      } as Item;
    });
    
    // Tri côté client par date décroissante
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    console.log('✅ Total objets trouvés:', items.length);
    return items;
  } catch (error) {
    console.error('❌ Erreur getItemsByTheme:', error);
    return [];
  }
};

export const voteForItem = async (itemId: string): Promise<void> => {
  try {
    const itemRef = doc(db, ITEMS_COLLECTION, itemId);
    await updateDoc(itemRef, {
      votes: increment(1)
    });
  } catch (error) {
    console.error('Erreur lors du vote:', error);
    throw error;
  }
};