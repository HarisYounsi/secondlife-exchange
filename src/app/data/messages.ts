export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  itemTitle: string;
  itemImage: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  messages: Message[];
}

export const mockConversations: Conversation[] = [
  {
    id: '1',
    partnerId: '3',
    partnerName: 'Thomas Dubois',
    partnerAvatar: 'https://ui-avatars.com/api/?name=Thomas+Dubois&background=3b82f6&color=fff',
    itemTitle: 'MacBook Air M1 2020',
    itemImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop',
    lastMessage: 'Parfait ! On se retrouve demain à 14h ?',
    lastMessageTime: '2024-12-18T10:30:00',
    unread: true,
    messages: [
      {
        id: 'm1',
        senderId: '1',
        senderName: 'Moi',
        senderAvatar: '',
        content: 'Bonjour ! Je suis intéressé par votre MacBook. Est-il toujours disponible ?',
        timestamp: '2024-12-17T14:20:00'
      },
      {
        id: 'm2',
        senderId: '3',
        senderName: 'Thomas Dubois',
        senderAvatar: 'https://ui-avatars.com/api/?name=Thomas+Dubois&background=3b82f6&color=fff',
        content: 'Oui, il est disponible ! Qu\'avez-vous à proposer en échange ?',
        timestamp: '2024-12-17T15:10:00'
      },
      {
        id: 'm3',
        senderId: '1',
        senderName: 'Moi',
        senderAvatar: '',
        content: 'J\'ai un iPad Pro 11" de 2021 avec l\'Apple Pencil. Ça vous intéresse ?',
        timestamp: '2024-12-17T15:25:00'
      },
      {
        id: 'm4',
        senderId: '3',
        senderName: 'Thomas Dubois',
        senderAvatar: 'https://ui-avatars.com/api/?name=Thomas+Dubois&background=3b82f6&color=fff',
        content: 'Super ! Ça m\'intéresse beaucoup. On peut se rencontrer pour échanger ?',
        timestamp: '2024-12-18T09:15:00'
      },
      {
        id: 'm5',
        senderId: '1',
        senderName: 'Moi',
        senderAvatar: '',
        content: 'Avec plaisir ! Demain après-midi vous convient ?',
        timestamp: '2024-12-18T09:45:00'
      },
      {
        id: 'm6',
        senderId: '3',
        senderName: 'Thomas Dubois',
        senderAvatar: 'https://ui-avatars.com/api/?name=Thomas+Dubois&background=3b82f6&color=fff',
        content: 'Parfait ! On se retrouve demain à 14h ?',
        timestamp: '2024-12-18T10:30:00'
      }
    ]
  },
  {
    id: '2',
    partnerId: '4',
    partnerName: 'Sophie Martin',
    partnerAvatar: 'https://ui-avatars.com/api/?name=Sophie+Martin&background=ec4899&color=fff',
    itemTitle: 'Nintendo Switch + 5 jeux',
    itemImage: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=100&h=100&fit=crop',
    lastMessage: 'Merci pour l\'échange !',
    lastMessageTime: '2024-12-16T16:20:00',
    unread: false,
    messages: [
      {
        id: 'm7',
        senderId: '4',
        senderName: 'Sophie Martin',
        senderAvatar: 'https://ui-avatars.com/api/?name=Sophie+Martin&background=ec4899&color=fff',
        content: 'Bonjour ! La tablette graphique est-elle toujours disponible ?',
        timestamp: '2024-12-15T11:00:00'
      },
      {
        id: 'm8',
        senderId: '1',
        senderName: 'Moi',
        senderAvatar: '',
        content: 'Oui ! Votre Switch m\'intéresse beaucoup.',
        timestamp: '2024-12-15T11:30:00'
      },
      {
        id: 'm9',
        senderId: '4',
        senderName: 'Sophie Martin',
        senderAvatar: 'https://ui-avatars.com/api/?name=Sophie+Martin&background=ec4899&color=fff',
        content: 'Parfait ! On peut faire l\'échange demain ?',
        timestamp: '2024-12-15T12:00:00'
      },
      {
        id: 'm10',
        senderId: '4',
        senderName: 'Sophie Martin',
        senderAvatar: 'https://ui-avatars.com/api/?name=Sophie+Martin&background=ec4899&color=fff',
        content: 'Merci pour l\'échange !',
        timestamp: '2024-12-16T16:20:00'
      }
    ]
  },
  {
    id: '3',
    partnerId: '6',
    partnerName: 'Emma Rousseau',
    partnerAvatar: 'https://ui-avatars.com/api/?name=Emma+Rousseau&background=f59e0b&color=fff',
    itemTitle: 'Casque Audio Sony WH-1000XM4',
    itemImage: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&h=100&fit=crop',
    lastMessage: 'D\'accord, je vous tiens au courant.',
    lastMessageTime: '2024-12-14T09:45:00',
    unread: false,
    messages: [
      {
        id: 'm11',
        senderId: '1',
        senderName: 'Moi',
        senderAvatar: '',
        content: 'Bonjour ! Votre casque est-il en bon état ?',
        timestamp: '2024-12-14T08:30:00'
      },
      {
        id: 'm12',
        senderId: '6',
        senderName: 'Emma Rousseau',
        senderAvatar: 'https://ui-avatars.com/api/?name=Emma+Rousseau&background=f59e0b&color=fff',
        content: 'Oui, excellent état ! Utilisé seulement 3 mois.',
        timestamp: '2024-12-14T09:00:00'
      },
      {
        id: 'm13',
        senderId: '1',
        senderName: 'Moi',
        senderAvatar: '',
        content: 'Super ! Je réfléchis et je reviens vers vous.',
        timestamp: '2024-12-14T09:30:00'
      },
      {
        id: 'm14',
        senderId: '6',
        senderName: 'Emma Rousseau',
        senderAvatar: 'https://ui-avatars.com/api/?name=Emma+Rousseau&background=f59e0b&color=fff',
        content: 'D\'accord, je vous tiens au courant.',
        timestamp: '2024-12-14T09:45:00'
      }
    ]
  }
];

export const getConversations = (userId: string): Conversation[] => {
  return mockConversations;
};

export const getConversation = (conversationId: string): Conversation | undefined => {
  return mockConversations.find(c => c.id === conversationId);
};
