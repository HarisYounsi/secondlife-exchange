import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Script de migration pour mettre à jour les anciennes propriétés utilisateurs
 * Convertit : name → displayName, avatar → photoURL, exchangeCount → exchangedItems, ecoScore → co2Saved
 */
export const migrateUserData = async (): Promise<void> => {
  try {
    console.log('🚀 Début de la migration des utilisateurs...');
    
    // Récupère tous les utilisateurs
    const usersSnapshot = await getDocs(collection(db, 'users'));
    let migrated = 0;
    let skipped = 0;
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const userId = userDoc.id;
      
      // Vérifie si l'utilisateur utilise l'ancien format
      const needsMigration = 
        userData.name || 
        userData.avatar || 
        userData.exchangeCount !== undefined || 
        userData.ecoScore !== undefined;
      
      if (!needsMigration) {
        console.log(`✓ User ${userId} déjà à jour`);
        skipped++;
        continue;
      }
      
      // Prépare les nouvelles données
      const updates: any = {};
      
      // Migre name → displayName
      if (userData.name && !userData.displayName) {
        updates.displayName = userData.name;
      }
      
      // Migre avatar → photoURL
      if (userData.avatar && !userData.photoURL) {
        updates.photoURL = userData.avatar;
      }
      
      // Migre exchangeCount → exchangedItems
      if (userData.exchangeCount !== undefined && userData.exchangedItems === undefined) {
        updates.exchangedItems = userData.exchangeCount;
      }
      
      // Migre ecoScore → co2Saved
      if (userData.ecoScore !== undefined && userData.co2Saved === undefined) {
        updates.co2Saved = userData.ecoScore;
      }
      
      // Ajoute joinedDate si manquant
      if (!userData.joinedDate) {
        updates.joinedDate = new Date().toISOString();
      }
      
      // Met à jour l'utilisateur
      if (Object.keys(updates).length > 0) {
        await updateDoc(doc(db, 'users', userId), updates);
        console.log(`✅ User ${userId} migré:`, updates);
        migrated++;
      }
    }
    
    console.log(`\n🎉 Migration terminée !`);
    console.log(`   - ${migrated} utilisateurs migrés`);
    console.log(`   - ${skipped} utilisateurs déjà à jour`);
    
    alert(`Migration réussie !\n${migrated} utilisateurs migrés\n${skipped} déjà à jour`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    alert('Erreur lors de la migration. Voir la console.');
    throw error;
  }
};

/**
 * Script de migration pour mettre à jour les anciennes propriétés des objets
 * Ajoute status: 'available' aux objets qui n'ont pas de status
 */
export const migrateItemData = async (): Promise<void> => {
  try {
    console.log('🚀 Début de la migration des objets...');
    
    const itemsSnapshot = await getDocs(collection(db, 'items'));
    let migrated = 0;
    let skipped = 0;
    
    for (const itemDoc of itemsSnapshot.docs) {
      const itemData = itemDoc.data();
      const itemId = itemDoc.id;
      
      // Vérifie si l'objet n'a pas de status
      if (!itemData.status) {
        await updateDoc(doc(db, 'items', itemId), {
          status: 'available'
        });
        console.log(`✅ Item ${itemId} (${itemData.title}) status ajouté`);
        migrated++;
      } else {
        skipped++;
      }
    }
    
    console.log(`\n🎉 Migration des objets terminée !`);
    console.log(`   - ${migrated} objets migrés`);
    console.log(`   - ${skipped} objets déjà à jour`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration des objets:', error);
    throw error;
  }
};

/**
 * Migration complète : utilisateurs + objets
 */
export const runFullMigration = async (): Promise<void> => {
  console.log('🚀 MIGRATION COMPLÈTE');
  console.log('====================\n');
  
  await migrateUserData();
  await migrateItemData();
  
  console.log('\n✅ MIGRATION COMPLÈTE TERMINÉE !');
  alert('Migration complète réussie ! Rafraîchissez la page.');
};