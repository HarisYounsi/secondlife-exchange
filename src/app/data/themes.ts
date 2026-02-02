export interface Theme {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  impact: {
    co2Saved: string;
    wasteReduced: string;
    description: string;
  };
  color: string;
  durationDays: number;
}

// Date de démarrage du système (ne change jamais)
const SYSTEM_START_DATE = new Date('2025-01-13'); // Lundi 13 janvier 2025

export const themes: Theme[] = [
  {
    id: '1',
    name: 'Électronique et Gadgets',
    category: 'electronics',
    description: 'Échangez vos appareils électroniques et découvrez de nouveaux gadgets. Smartphones, tablettes, ordinateurs portables et accessoires.',
    icon: 'Laptop',
    impact: {
      co2Saved: '45kg par appareil',
      wasteReduced: '2.3T de déchets électroniques',
      description: 'La production d\'un smartphone génère environ 85kg de CO₂. En échangeant plutôt qu\'en achetant neuf, vous évitez cette empreinte carbone.'
    },
    color: 'blue',
    durationDays: 7
  },
  {
    id: '2',
    name: 'Mode et Vêtements',
    category: 'clothing',
    description: 'Renouvelez votre garde-robe de manière responsable. Vêtements, chaussures et accessoires pour tous les styles.',
    icon: 'Shirt',
    impact: {
      co2Saved: '3kg par vêtement',
      wasteReduced: '1.8T de textiles',
      description: 'L\'industrie de la mode est responsable de 10% des émissions mondiales de CO₂. Échanger prolonge la vie des vêtements et réduit la demande de production.'
    },
    color: 'pink',
    durationDays: 7
  },
  {
    id: '3',
    name: 'Livres et Culture',
    category: 'books',
    description: 'Partagez vos lectures et découvrez de nouvelles histoires. Romans, BD, livres techniques et magazines.',
    icon: 'Book',
    impact: {
      co2Saved: '1.5kg par livre',
      wasteReduced: '500kg de papier',
      description: 'La production d\'un livre neuf nécessite environ 7.5kg de CO₂. Échanger des livres permet de partager la culture tout en préservant les forêts.'
    },
    color: 'amber',
    durationDays: 7
  },
  {
    id: '4',
    name: 'Mobilier et Décoration',
    category: 'furniture',
    description: 'Transformez votre intérieur avec des meubles de seconde main. Tables, chaises, lampes et objets déco.',
    icon: 'Sofa',
    impact: {
      co2Saved: '150kg par meuble',
      wasteReduced: '3.5T de déchets',
      description: 'Les meubles représentent une part importante des déchets. Échanger plutôt que jeter prolonge leur durée de vie et économise les ressources.'
    },
    color: 'purple',
    durationDays: 7
  },
  {
    id: '5',
    name: 'Sports et Loisirs',
    category: 'sports',
    description: 'Équipement sportif et loisirs créatifs. Vélos, matériel de camping, instruments de musique et plus.',
    icon: 'Bike',
    impact: {
      co2Saved: '25kg par équipement',
      wasteReduced: '800kg de matériel',
      description: 'L\'équipement sportif est souvent peu utilisé. L\'échanger permet à d\'autres d\'en profiter sans produire de nouveaux objets.'
    },
    color: 'green',
    durationDays: 7
  }
];

// Calcule le thème actuel basé sur le nombre de jours depuis le démarrage
export const getCurrentTheme = (): { theme: Theme; startDate: string; endDate: string } => {
  const today = new Date();
  const daysSinceStart = Math.floor((today.getTime() - SYSTEM_START_DATE.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calcule la longueur totale du cycle
  const cycleLength = themes.reduce((sum, t) => sum + t.durationDays, 0);
  
  // Trouve la position dans le cycle actuel
  const adjustedDays = daysSinceStart % cycleLength;
  
  // Trouve le thème correspondant
  let totalDays = 0;
  let currentThemeIndex = 0;
  
  for (let i = 0; i < themes.length; i++) {
    if (adjustedDays < totalDays + themes[i].durationDays) {
      currentThemeIndex = i;
      break;
    }
    totalDays += themes[i].durationDays;
  }
  
  const currentTheme = themes[currentThemeIndex];
  
  // Calcule les dates de début et fin du thème actuel
  const cycleNumber = Math.floor(daysSinceStart / cycleLength);
  const startDate = new Date(SYSTEM_START_DATE.getTime() + (cycleNumber * cycleLength + totalDays) * 24 * 60 * 60 * 1000);
  const endDate = new Date(startDate.getTime() + (currentTheme.durationDays - 1) * 24 * 60 * 60 * 1000);
  
  return {
    theme: currentTheme,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
};

// Retourne les thèmes à venir (les 3 prochains)
export const getUpcomingThemes = (): Array<{ theme: Theme; startDate: string }> => {
  const { theme: currentTheme, endDate } = getCurrentTheme();
  const currentIndex = themes.findIndex(t => t.id === currentTheme.id);
  
  const upcoming = [];
  let nextStartDate = new Date(endDate);
  nextStartDate.setDate(nextStartDate.getDate() + 1);
  
  for (let i = 1; i <= 3; i++) {
    const nextIndex = (currentIndex + i) % themes.length;
    const nextTheme = themes[nextIndex];
    
    upcoming.push({
      theme: nextTheme,
      startDate: nextStartDate.toISOString().split('T')[0]
    });
    
    nextStartDate = new Date(nextStartDate);
    nextStartDate.setDate(nextStartDate.getDate() + nextTheme.durationDays);
  }
  
  return upcoming;
};