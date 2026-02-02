import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export const getGlobalStats = async () => {
  try {
    // Compte le nombre d'utilisateurs
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const userCount = usersSnapshot.size;

    // Compte le nombre d'objets
    const itemsSnapshot = await getDocs(collection(db, 'items'));
    const itemCount = itemsSnapshot.size;

    return {
      participants: userCount,
      objectsAvailable: itemCount
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error);
    return {
      participants: 0,
      objectsAvailable: 0
    };
  }
};

// Nouvelle fonction pour récupérer stats d'un thème spécifique
export const getThemeStats = async (themeId: string) => {
  try {
    // Compte le nombre d'utilisateurs
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const userCount = usersSnapshot.size;

    // Compte SEULEMENT les objets du thème
    const q = query(collection(db, 'items'), where('themeId', '==', themeId));
    const itemsSnapshot = await getDocs(q);
    const itemCount = itemsSnapshot.size;

    return {
      participants: userCount,
      objectsAvailable: itemCount
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des stats du thème:', error);
    return {
      participants: 0,
      objectsAvailable: 0
    };
  }
};