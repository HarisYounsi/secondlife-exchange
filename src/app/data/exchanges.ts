export interface Exchange {
  id: string;
  itemOffered: {
    id: string;
    title: string;
    image: string;
  };
  itemReceived: {
    id: string;
    title: string;
    image: string;
  };
  partnerName: string;
  partnerAvatar: string;
  status: 'completed' | 'pending' | 'cancelled';
  date: string;
  ecoImpact: number; // CO2 saved in kg
}

export const mockExchanges: Exchange[] = [
  {
    id: '1',
    itemOffered: {
      id: '101',
      title: 'iPhone 11 Pro',
      image: 'https://images.unsplash.com/photo-1592286927505-2fd7c3ccbfa4?w=200&h=200&fit=crop'
    },
    itemReceived: {
      id: '102',
      title: 'iPad Mini 2021',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop'
    },
    partnerName: 'Sophie Martin',
    partnerAvatar: 'https://ui-avatars.com/api/?name=Sophie+Martin&background=ec4899&color=fff',
    status: 'completed',
    date: '2024-12-10',
    ecoImpact: 42
  },
  {
    id: '2',
    itemOffered: {
      id: '103',
      title: 'Manteau d\'hiver',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200&h=200&fit=crop'
    },
    itemReceived: {
      id: '104',
      title: 'Veste en cuir',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop'
    },
    partnerName: 'Emma Rousseau',
    partnerAvatar: 'https://ui-avatars.com/api/?name=Emma+Rousseau&background=f59e0b&color=fff',
    status: 'completed',
    date: '2024-11-28',
    ecoImpact: 3
  },
  {
    id: '3',
    itemOffered: {
      id: '105',
      title: 'Collection Harry Potter',
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=200&fit=crop'
    },
    itemReceived: {
      id: '106',
      title: 'Romans de Fantasy',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=200&fit=crop'
    },
    partnerName: 'Thomas Dubois',
    partnerAvatar: 'https://ui-avatars.com/api/?name=Thomas+Dubois&background=3b82f6&color=fff',
    status: 'pending',
    date: '2024-12-15',
    ecoImpact: 1.5
  }
];

export const getUserExchanges = (userId: string): Exchange[] => {
  return mockExchanges;
};

export const getUserStats = () => {
  const completed = mockExchanges.filter(e => e.status === 'completed').length;
  const totalImpact = mockExchanges.reduce((sum, e) => sum + e.ecoImpact, 0);
  
  return {
    totalExchanges: completed,
    pendingExchanges: mockExchanges.filter(e => e.status === 'pending').length,
    ecoScore: Math.round(totalImpact * 10),
    co2Saved: totalImpact
  };
};
