export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: 'excellent' | 'good' | 'fair';
  image: string;
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: string;
  themeId: string; // "none" pour objets hors thème
  votes: number;
  status?: 'available' | 'exchanged'; // Statut de l'objet
  exchangeId?: string; // ID de l'échange si échangé
}


export const mockItems: Item[] = [
  {
    id: '1',
    title: 'iPhone 12 Pro - 128GB',
    description: 'Excellent état, batterie à 89%. Livré avec chargeur et coque de protection. Recherche une tablette ou ordinateur portable en échange.',
    category: 'electronics',
    condition: 'excellent',
    image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=400&fit=crop',
    userId: '2',
    userName: 'Marie Laurent',
    userAvatar: 'https://ui-avatars.com/api/?name=Marie+Laurent&background=10b981&color=fff',
    createdAt: '2024-12-17T10:30:00',
    themeId: '1',
    votes: 24
  },
  {
    id: '2',
    title: 'MacBook Air M1 2020',
    description: 'Ordinateur portable en très bon état, utilisé principalement pour le bureau. 8Go RAM, 256Go SSD. Ouvert à tous types d\'échange électronique.',
    category: 'electronics',
    condition: 'good',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    userId: '3',
    userName: 'Thomas Dubois',
    userAvatar: 'https://ui-avatars.com/api/?name=Thomas+Dubois&background=3b82f6&color=fff',
    createdAt: '2024-12-17T09:15:00',
    themeId: '1',
    votes: 18
  },
  {
    id: '3',
    title: 'Nintendo Switch + 5 jeux',
    description: 'Console en excellent état avec 5 jeux (Zelda, Mario Kart, Animal Crossing, etc.). Recherche une tablette graphique ou appareil photo.',
    category: 'electronics',
    condition: 'excellent',
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop',
    userId: '4',
    userName: 'Sophie Martin',
    userAvatar: 'https://ui-avatars.com/api/?name=Sophie+Martin&background=ec4899&color=fff',
    createdAt: '2024-12-16T14:20:00',
    themeId: '1',
    votes: 32
  },
  {
    id: '4',
    title: 'iPad Pro 11" 2021',
    description: 'Tablette Apple avec Apple Pencil de 2ème génération. Parfait pour dessiner ou prendre des notes. État impeccable.',
    category: 'electronics',
    condition: 'excellent',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    userId: '5',
    userName: 'Lucas Petit',
    userAvatar: 'https://ui-avatars.com/api/?name=Lucas+Petit&background=8b5cf6&color=fff',
    createdAt: '2024-12-16T11:00:00',
    themeId: '1',
    votes: 15
  },
  {
    id: '5',
    title: 'Casque Audio Sony WH-1000XM4',
    description: 'Casque à réduction de bruit active. Utilisé quelques mois, comme neuf. Avec étui de transport et câbles.',
    category: 'electronics',
    condition: 'excellent',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
    userId: '6',
    userName: 'Emma Rousseau',
    userAvatar: 'https://ui-avatars.com/api/?name=Emma+Rousseau&background=f59e0b&color=fff',
    createdAt: '2024-12-17T16:45:00',
    themeId: '1',
    votes: 21
  },
  {
    id: '6',
    title: 'Appareil Photo Canon EOS M50',
    description: 'Hybride parfait pour débuter. Livré avec objectif 15-45mm et carte SD 64Go. Recherche ordinateur portable.',
    category: 'electronics',
    condition: 'good',
    image: 'https://images.unsplash.com/photo-1606980707002-937b8ea2d0f8?w=400&h=400&fit=crop',
    userId: '7',
    userName: 'Antoine Bernard',
    userAvatar: 'https://ui-avatars.com/api/?name=Antoine+Bernard&background=06b6d4&color=fff',
    createdAt: '2024-12-18T08:30:00',
    themeId: '1',
    votes: 27
  }
];

export const getItemsByTheme = (themeId: string): Item[] => {
  return mockItems.filter(item => item.themeId === themeId);
};

export const addItem = (item: Omit<Item, 'id' | 'createdAt' | 'votes'>): Item => {
  const newItem: Item = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    votes: 0
  };
  mockItems.push(newItem);
  return newItem;
};