import React, {useEffect, useState} from "react";
import {Button} from "./ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card";
import {Badge} from "./ui/badge";
import {
  ArrowRight,
  Leaf,
  Users,
  Package,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {getCurrentTheme} from "../data/themes";
import {getGlobalStats} from "../../services/statsService";

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({setActiveTab}) => {
  const {theme: currentTheme, endDate} = getCurrentTheme();
  const [stats, setStats] = useState({participants: 0, objectsAvailable: 0});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      const data = await getGlobalStats();
      setStats(data);
      setIsLoading(false);
    };
    loadStats();
  }, []);

  const getDaysRemaining = (end: string) => {
    const diff =
      new Date(end).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="space-y-10">

      {/* HERO : vert bien présent mais clean */}
      <section className="relative overflow-hidden rounded-2xl bg-emerald-600">
        {/* déco subtile (pas de dégradé) */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-black/10" />

        <div className="relative p-8 md:p-12 text-white">
          <Badge className="bg-white/15 text-white border-white/20 mb-4">
            Économie circulaire
          </Badge>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Échangez autrement,
                <br />
                gardez l’essentiel
              </h1>

              <p className="text-emerald-50 mb-6 max-w-xl">
                Donnez une seconde vie à vos objets. Chaque semaine, un thème
                pour échanger simplement et réduire le gaspillage.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold"
                  onClick={() => setActiveTab("themes")}
                >
                  Voir le thème de la semaine
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => setActiveTab("discover")}
                >
                  Découvrir
                </Button>
              </div>
            </div>

            {/* mini panneau à droite (différencie des autres) */}
            <div className="bg-white/10 border border-white/15 rounded-2xl p-6">
              <p className="text-sm text-emerald-50 mb-3">
                Focus cette semaine
              </p>
              <p className="text-2xl font-bold">{currentTheme.name}</p>
              <p className="text-emerald-50 mt-2 line-clamp-3">
                {currentTheme.description}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-black/10 p-3">
                  <p className="text-xs text-emerald-50">Jours</p>
                  <p className="text-lg font-bold">
                    {getDaysRemaining(endDate)}
                  </p>
                </div>
                <div className="rounded-xl bg-black/10 p-3">
                  <p className="text-xs text-emerald-50">Membres</p>
                  <p className="text-lg font-bold">
                    {isLoading ? "…" : stats.participants}
                  </p>
                </div>
                <div className="rounded-xl bg-black/10 p-3">
                  <p className="text-xs text-emerald-50">Objets</p>
                  <p className="text-lg font-bold">
                    {isLoading ? "…" : stats.objectsAvailable}
                  </p>
                </div>
              </div>

              <Button
                className="mt-6 w-full bg-white text-emerald-700 hover:bg-emerald-50 font-semibold"
                onClick={() => setActiveTab("themes")}
              >
                Participer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS : cards blanches, accents verts (pas multicolore) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Objets échangés</p>
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {isLoading ? "…" : stats.objectsAvailable}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Membres actifs</p>
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {isLoading ? "…" : stats.participants}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Thèmes disponibles</p>
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">5</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">CO₂ économisé</p>
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {isLoading ? "…" : `${(stats.objectsAvailable * 15).toFixed(0)}kg`}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* COMMENT ÇA MARCHE (plus clean, vert cohérent) */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Comment ça marche ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Proposez un objet",
              text: "Ajoutez les objets que vous n'utilisez plus.",
            },
            {
              title: "Trouvez un échange",
              text: "Parcourez les propositions de la communauté.",
            },
            {
              title: "Échangez facilement",
              text: "Discutez et organisez l’échange simplement.",
            },
          ].map((s, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-emerald-700">
                    {i + 1}
                  </span>
                </div>
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                {s.text}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* IMPACT (vert léger, pas de dégradé) */}
      <Card className="border border-emerald-100 bg-emerald-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-700" />
            <CardTitle className="text-2xl">Notre impact collectif</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            En échangeant plutôt qu'en achetant neuf, vous réduisez l’empreinte
            carbone et limitez la production de déchets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 text-center shadow-sm">
              <Leaf className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {isLoading ? "…" : `${(stats.objectsAvailable * 15).toFixed(0)}kg`}
              </p>
              <p className="text-sm text-gray-600">CO₂ économisé</p>
            </div>

            <div className="bg-white rounded-xl p-5 text-center shadow-sm">
              <Package className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {isLoading ? "…" : stats.objectsAvailable}
              </p>
              <p className="text-sm text-gray-600">Objets sauvés</p>
            </div>

            <div className="bg-white rounded-xl p-5 text-center shadow-sm">
              <TrendingUp className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {isLoading ? "…" : `${(stats.objectsAvailable * 1.2).toFixed(0)}kg`}
              </p>
              <p className="text-sm text-gray-600">Déchets évités</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA : vert mais sobre */}
      <Card className="border border-emerald-100 bg-white">
        <CardContent className="p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
            Prêt à rejoindre le mouvement ?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Inscrivez-vous gratuitement et commencez à échanger dès aujourd'hui.
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            onClick={() => setActiveTab("themes")}
          >
            Découvrir les objets disponibles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
