import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./ui/card";
import {Badge} from "./ui/badge";
import {Button} from "./ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "./ui/tabs";
import {
  BookOpen,
  TrendingUp,
  Wrench,
  Lightbulb,
  Leaf,
  FileVideo,
  Clock,
  ExternalLink,
  Play,
} from "lucide-react";

export const Discover: React.FC = () => {
  const articles = [
    {
      id: 1,
      title: "L'impact environnemental du numérique",
      description:
        "Découvrez pourquoi l'échange d'appareils électroniques est crucial pour notre planète",
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
      category: "environment",
      readTime: "5 min",
      url: "https://agirpourlatransition.ademe.fr/particuliers/bureau/numerique",
    },
    {
      id: 2,
      title: "Comment réparer plutôt que jeter",
      description: "Guide pratique pour donner une seconde vie à vos objets",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      category: "repair",
      readTime: "8 min",
      url: "https://longuevieauxobjets.gouv.fr/",
    },
    {
      id: 3,
      title: "Les principes de l'économie circulaire",
      description: "Comprendre le modèle économique de demain",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
      category: "environment",
      readTime: "6 min",
      url: "https://economie-circulaire.ademe.fr/economie-circulaire",
    },
    {
      id: 4,
      title: "L'impact de la fast fashion",
      description: "Pourquoi l'échange de vêtements est essentiel pour la planète",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      category: "environment",
      readTime: "7 min",
      url: "https://agirpourlatransition.ademe.fr/particuliers/maison/dechets/fabriquer-vos-habits-durent",
    },
    {
      id: 5,
      title: "Guide d'entretien des appareils",
      description: "Conseils pour prolonger la durée de vie de vos appareils",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop",
      category: "tips",
      readTime: "10 min",
      url: "https://longuevieauxobjets.gouv.fr/entretenir",
    },
    {
      id: 6,
      title: "Les déchets électroniques dans le monde",
      description: "Les chiffres qui font réfléchir sur notre consommation",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
      category: "stats",
      readTime: "4 min",
      url: "https://librairie.ademe.fr/dechets-economie-circulaire/5226-evaluation-de-l-impact-environnemental-du-numerique-en-france-et-analyse-prospective.html",
    },
  ];

  const statistics = [
    {
      value: "59M tonnes",
      label: "Déchets électroniques mondiaux",
      description: "Générés chaque année dans le monde",
      source: "Global E-waste Monitor 2024",
    },
    {
      value: "10%",
      label: "Émissions de la mode",
      description: "Des émissions mondiales de CO₂",
      source: "Ellen MacArthur Foundation",
    },
    {
      value: "17%",
      label: "Taux de recyclage",
      description: "Des déchets électroniques recyclés",
      source: "Global E-waste Monitor",
    },
    {
      value: "700Mds€",
      label: "Économie potentielle",
      description: "Par an avec l'économie circulaire",
      source: "Commission Européenne",
    },
    {
      value: "2.5 ans",
      label: "Durée de vie moyenne",
      description: "D'un smartphone avant remplacement",
      source: "ADEME France",
    },
    {
      value: "92M tonnes",
      label: "Textiles jetés",
      description: "De vêtements jetés par an",
      source: "Fashion Revolution",
    },
  ];

  const repairTips = [
    {
      category: "Électronique",
      tips: [
        "Nettoyez régulièrement les ports de charge",
        "Utilisez des protections d'écran et coques",
        "Évitez les températures extrêmes",
        "Mettez à jour les logiciels régulièrement",
      ],
    },
    {
      category: "Vêtements",
      tips: [
        "Lavez à basse température",
        "Réparez les petites déchirures rapidement",
        "Utilisez des produits de lavage doux",
        "Évitez le sèche-linge quand possible",
      ],
    },
    {
      category: "Mobilier",
      tips: [
        "Traitez le bois régulièrement",
        "Resserrez les vis et fixations",
        "Protégez des rayons directs du soleil",
        "Nettoyez avec des produits adaptés",
      ],
    },
    {
      category: "Livres",
      tips: [
        "Conservez dans un endroit sec",
        "Évitez l'exposition directe au soleil",
        "Utilisez des signets plutôt que corner les pages",
        "Rangez verticalement pour éviter les déformations",
      ],
    },
  ];

  const videoResources = [
    {
      title: "Qu'est-ce que l'économie circulaire ?",
      description:
        "Une vidéo en français qui explique simplement ce qu’est l’économie circulaire.",
      thumbnail: "https://img.youtube.com/vi/rUU7nky2MRY/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=rUU7nky2MRY",
      duration: "3:15",
    },
    {
      title: "Réparer plutôt que jeter !",
      description:
        "Une vidéo en français qui encourage la réparation des objets plutôt que de les jeter.",
      thumbnail: "https://img.youtube.com/vi/WMm9w0cM8lg/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=WMm9w0cM8lg",
      duration: "4:00",
    },
  ];

  const getArticlesByCategory = (category: string) =>
    articles.filter((a) => a.category === category);

  const categoryMeta: Record<
    string,
    {label: string; icon: any; badge: string}
  > = {
    environment: {
      label: "Environnement",
      icon: Leaf,
      badge: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    },
    repair: {
      label: "Réparation",
      icon: Wrench,
      badge: "bg-amber-100 text-amber-800 border border-amber-200",
    },
    stats: {
      label: "Stats",
      icon: TrendingUp,
      badge: "bg-slate-100 text-slate-700 border border-slate-200",
    },
    tips: {
      label: "Conseils",
      icon: Lightbulb,
      badge: "bg-amber-100 text-amber-800 border border-amber-200",
    },
  };

  const ArticleCard = ({article}: any) => {
    const meta = categoryMeta[article.category] || categoryMeta.stats;
    const Icon = meta.icon;

    return (
      <Card className="overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-video overflow-hidden bg-gray-100">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
          />
        </div>

        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${meta.badge}`}>
              <Icon className="w-3.5 h-3.5" />
              {meta.label}
            </span>

            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <CardTitle className="text-lg">{article.title}</CardTitle>
          <CardDescription>{article.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            variant="outline"
            className="w-full rounded-xl"
            onClick={() => window.open(article.url, "_blank")}
          >
            Lire
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Centre de découverte
        </h1>
        <p className="text-lg text-gray-600">
          Articles, chiffres et ressources pour comprendre l’économie circulaire.
        </p>
      </div>

      {/* HERO (vert uni, pas de dégradé) */}
      <section className="relative overflow-hidden rounded-2xl bg-emerald-600 p-8 md:p-12 text-white">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-black/10" />

        <div className="relative">
          <h2 className="text-3xl font-bold mb-3">
            Pourquoi l’économie circulaire ?
          </h2>
          <p className="text-emerald-50 max-w-2xl mb-8">
            Moins de déchets, moins d’extraction, plus de durée de vie : l’échange
            a un vrai impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statistics.slice(0, 3).map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 border border-white/15 rounded-2xl p-6"
              >
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-lg font-medium mb-1">{stat.label}</p>
                <p className="text-sm text-emerald-50/90">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section>
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              Articles et ressources
            </h2>
          </div>

          <TabsList className="grid w-full max-w-2xl grid-cols-5 bg-white border shadow-sm">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="environment">
              <Leaf className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Env</span>
            </TabsTrigger>
            <TabsTrigger value="repair">
              <Wrench className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Répa</span>
            </TabsTrigger>
            <TabsTrigger value="stats">
              <TrendingUp className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="tips">
              <Lightbulb className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Conseils</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>

          {["environment", "repair", "stats", "tips"].map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getArticlesByCategory(category).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* CONSEILS */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Wrench className="w-6 h-6 text-emerald-600" />
          Conseils d’entretien
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repairTips.map((category, index) => (
            <Card key={index} className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
          Statistiques clés
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statistics.map((stat, index) => (
            <Card key={index} className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-3xl text-emerald-700">
                  {stat.value}
                </CardTitle>
                <CardDescription className="text-base font-medium text-gray-900">
                  {stat.label}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{stat.description}</p>
                <p className="text-xs text-gray-500 italic">Source: {stat.source}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* VIDEOS */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FileVideo className="w-6 h-6 text-emerald-600" />
          Ressources vidéo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoResources.map((video, index) => (
            <a
              key={index}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video overflow-hidden bg-gray-100 relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-emerald-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
