export interface Article {
  id: string;
  title: string;
  description: string;
  category: 'environment' | 'repair' | 'stats' | 'tips';
  image: string;
  readTime: string;
  content: string;
}

export interface Statistic {
  label: string;
  value: string;
  description: string;
  source: string;
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'L\'impact environnemental de l\'électronique',
    description: 'Découvrez pourquoi l\'échange d\'appareils électroniques est crucial pour notre planète',
    category: 'environment',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&h=400&fit=crop',
    readTime: '5 min',
    content: 'La production d\'un smartphone génère environ 85kg de CO₂. En échangeant plutôt qu\'en achetant neuf, vous évitez cette empreinte carbone considérable.'
  },
  {
    id: '2',
    title: 'Comment réparer plutôt que jeter',
    description: 'Guide pratique pour donner une seconde vie à vos objets',
    category: 'repair',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
    readTime: '8 min',
    content: 'Apprenez les bases de la réparation pour prolonger la vie de vos objets et réduire vos déchets.'
  },
  {
    id: '3',
    title: 'Les principes de l\'économie circulaire',
    description: 'Comprendre le modèle économique de demain',
    category: 'environment',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop',
    readTime: '6 min',
    content: 'L\'économie circulaire vise à réduire le gaspillage en maintenant les produits en circulation le plus longtemps possible.'
  },
  {
    id: '4',
    title: 'Fast Fashion : L\'impact caché de nos vêtements',
    description: 'Pourquoi l\'échange de vêtements est essentiel',
    category: 'environment',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
    readTime: '7 min',
    content: 'L\'industrie de la mode est responsable de 10% des émissions mondiales de CO₂. Chaque vêtement échangé fait une différence.'
  },
  {
    id: '5',
    title: 'Guide de l\'entretien des appareils électroniques',
    description: 'Conseils pour prolonger la durée de vie de vos appareils',
    category: 'tips',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
    readTime: '10 min',
    content: 'Des astuces simples pour maintenir vos appareils en bon état plus longtemps.'
  },
  {
    id: '6',
    title: 'Statistiques mondiales sur les déchets',
    description: 'Les chiffres qui font réfléchir',
    category: 'stats',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop',
    readTime: '4 min',
    content: 'Chaque année, 50 millions de tonnes de déchets électroniques sont générés dans le monde.'
  }
];

export const statistics: Statistic[] = [
  {
    label: 'Déchets électroniques mondiaux',
    value: '50M tonnes',
    description: 'Générés chaque année dans le monde',
    source: 'ONU - Rapport 2023'
  },
  {
    label: 'Émissions de la mode',
    value: '10%',
    description: 'Des émissions mondiales de CO₂',
    source: 'Ellen MacArthur Foundation'
  },
  {
    label: 'Taux de recyclage',
    value: '17%',
    description: 'Des déchets électroniques recyclés',
    source: 'Global E-waste Monitor'
  },
  {
    label: 'Économie potentielle',
    value: '700Mds€',
    description: 'Par an avec l\'économie circulaire',
    source: 'Commission Européenne'
  },
  {
    label: 'Durée de vie moyenne',
    value: '2.5 ans',
    description: 'D\'un smartphone avant remplacement',
    source: 'ADEME France'
  },
  {
    label: 'Textiles jetés',
    value: '92M tonnes',
    description: 'De vêtements jetés par an',
    source: 'Fashion Revolution'
  }
];

export const repairTips = [
  {
    category: 'Électronique',
    tips: [
      'Nettoyez régulièrement les ports de charge',
      'Utilisez des protections d\'écran et coques',
      'Évitez les températures extrêmes',
      'Mettez à jour les logiciels régulièrement'
    ]
  },
  {
    category: 'Vêtements',
    tips: [
      'Lavez à basse température',
      'Réparez les petites déchirures rapidement',
      'Utilisez des produits de lavage doux',
      'Évitez le sèche-linge quand possible'
    ]
  },
  {
    category: 'Mobilier',
    tips: [
      'Traitez le bois régulièrement',
      'Resserrez les vis et fixations',
      'Protégez des rayons directs du soleil',
      'Nettoyez avec des produits adaptés'
    ]
  },
  {
    category: 'Livres',
    tips: [
      'Conservez dans un endroit sec',
      'Évitez l\'exposition directe au soleil',
      'Utilisez des signets plutôt que corner les pages',
      'Rangez verticalement pour éviter les déformations'
    ]
  }
];

export const getArticlesByCategory = (category: string) => {
  return articles.filter(article => article.category === category);
};
