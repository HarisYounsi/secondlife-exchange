import React, {useEffect, useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {Badge} from "./ui/badge";
import {Button} from "./ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "./ui/tabs";
import {ItemCard} from "./ItemCard";
import {AddItemDialog} from "./AddItemDialog";
import {getCurrentTheme, getUpcomingThemes} from "../data/themes";
import {Item} from "../data/items";
import {getAllItems, getItemsByTheme, voteForItem} from "../../services/itemsService";
import {useAuth} from "../contexts/AuthContext";
import {
  Plus,
  Calendar,
  TrendingUp,
  Leaf,
  Clock,
  Lock,
  Sparkles,
} from "lucide-react";
import {Laptop, Shirt, Book, Sofa, Bike} from "lucide-react";
import {toast} from "sonner";
import {getOrCreateConversation} from "../../services/conversationService";

const iconMap: Record<string, any> = {
  Laptop,
  Shirt,
  Book,
  Sofa,
  Bike,
};

type ThemeColor = "emerald" | "amber" | "blue" | "purple" | "slate";

const themeColorClasses: Record<
  string,
  {chip: string; iconBg: string; iconText: string; border: string}
> = {
  emerald: {
    chip: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-emerald-100",
    iconText: "text-emerald-700",
    border: "border-emerald-200",
  },
  amber: {
    chip: "bg-amber-100 text-amber-700",
    iconBg: "bg-amber-100",
    iconText: "text-amber-700",
    border: "border-amber-200",
  },
  blue: {
    chip: "bg-blue-100 text-blue-700",
    iconBg: "bg-blue-100",
    iconText: "text-blue-700",
    border: "border-blue-200",
  },
  purple: {
    chip: "bg-purple-100 text-purple-700",
    iconBg: "bg-purple-100",
    iconText: "text-purple-700",
    border: "border-purple-200",
  },
  slate: {
    chip: "bg-slate-100 text-slate-700",
    iconBg: "bg-slate-100",
    iconText: "text-slate-700",
    border: "border-slate-200",
  },
};

interface ThemesProps {
  setActiveTab?: (tab: string) => void;
}

export const Themes: React.FC<ThemesProps> = ({setActiveTab}) => {
  const {user} = useAuth();
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [dialogSource, setDialogSource] = useState<"hero" | "empty">("hero");
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [themeItems, setThemeItems] = useState<Item[]>([]);
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const {theme: currentTheme, endDate} = getCurrentTheme();
  const upcomingThemes = getUpcomingThemes();

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTheme.id]);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const [all, theme] = await Promise.all([
        getAllItems(),
        getItemsByTheme(currentTheme.id),
      ]);
      setAllItems(all);
      setThemeItems(theme);
    } catch (error) {
      toast.error("Erreur lors du chargement des objets");
    } finally {
      setIsLoading(false);
    }
  };

  const getDaysRemaining = (end: string) => {
    const diff = new Date(end).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const handleVote = async (itemId: string) => {
    if (!user) {
      toast.error("Connectez-vous pour voter");
      return;
    }

    if (votedItems.has(itemId)) {
      toast.info("Vous avez déjà voté pour cet objet");
      return;
    }

    try {
      await voteForItem(itemId);
      setAllItems(
        allItems.map((item) =>
          item.id === itemId ? {...item, votes: item.votes + 1} : item
        )
      );
      setThemeItems(
        themeItems.map((item) =>
          item.id === itemId ? {...item, votes: item.votes + 1} : item
        )
      );
      setVotedItems(new Set(votedItems).add(itemId));
      toast.success("Vote enregistré !");
    } catch (error) {
      toast.error("Erreur lors du vote");
    }
  };

  const handleContact = async (item: Item) => {
    if (!user) {
      toast.error("Connectez-vous pour contacter");
      return;
    }

    if (item.userId === user.uid) {
      toast.error("Vous ne pouvez pas vous contacter vous-même");
      return;
    }

    try {
      await getOrCreateConversation(user.uid, item.userId, item.id);
      toast.success(`Conversation ouverte avec ${item.userName}`);
      if (setActiveTab) setActiveTab("messages");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Erreur conversation:", error);
      toast.error("Erreur lors de l'ouverture de la conversation");
    }
  };

  const handleProposeItem = (source: "hero" | "empty" = "hero") => {
    if (!user) {
      toast.error("Connectez-vous pour proposer un objet", {
        description: "Créez un compte ou connectez-vous pour partager vos objets",
      });
      return;
    }
    setDialogSource(source);
    setAddItemDialogOpen(true);
  };

  const ThemeIcon = iconMap[currentTheme.icon] || Calendar;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-gray-50">

      {/* HERO : vert uni + panneau info (pas de dégradé) */}
      <section className="relative overflow-hidden rounded-2xl bg-emerald-600">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-black/10" />

        <div className="relative p-8 md:p-12 text-white">
          <Badge className="bg-white/15 text-white border-white/20 mb-4">
            Thème de la semaine
          </Badge>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-white/15 rounded-xl">
                  <ThemeIcon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {currentTheme.name}
                  </h1>
                  <p className="text-emerald-50">
                    {currentTheme.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-emerald-50 font-medium"
                  onClick={() => handleProposeItem("hero")}
                >
                  {!user && <Lock className="w-5 h-5 mr-2" />}
                  <Plus className="w-5 h-5 mr-2" />
                  Proposer un objet
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => {
                    const el = document.getElementById("theme-items");
                    if (el) el.scrollIntoView({behavior: "smooth"});
                  }}
                >
                  Voir les objets
                </Button>
              </div>
            </div>

            {/* Panneau chiffres */}
            <div className="bg-white/10 border border-white/15 rounded-2xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-black/10 p-4">
                  <Clock className="w-5 h-5 mb-2" />
                  <p className="text-sm opacity-90">Se termine dans</p>
                  <p className="text-2xl font-bold">
                    {getDaysRemaining(endDate)} j
                  </p>
                </div>
                <div className="rounded-xl bg-black/10 p-4">
                  <TrendingUp className="w-5 h-5 mb-2" />
                  <p className="text-sm opacity-90">Objets du thème</p>
                  <p className="text-2xl font-bold">{themeItems.length}</p>
                </div>
                <div className="rounded-xl bg-black/10 p-4">
                  <Leaf className="w-5 h-5 mb-2" />
                  <p className="text-sm opacity-90">CO₂ économisé</p>
                  <p className="text-2xl font-bold">
                    {currentTheme.impact.co2Saved}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-sm text-emerald-50">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>
                    Votez pour les meilleurs objets et contactez les propriétaires.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT : carte blanche + bordure verte */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-sm border border-emerald-100">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-700" />
              <CardTitle>Impact écologique de ce thème</CardTitle>
            </div>
            <CardDescription className="text-gray-600">
              {currentTheme.impact.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">CO₂ économisé</p>
                <p className="text-lg font-semibold text-gray-900">
                  {currentTheme.impact.co2Saved}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Déchets réduits</p>
                <p className="text-lg font-semibold text-gray-900">
                  {currentTheme.impact.wasteReduced}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* TABS : plus clean */}
      <section
        id="theme-items"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <Tabs defaultValue="theme" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto bg-white border shadow-sm">
            <TabsTrigger value="theme" className="text-xs sm:text-sm px-2 py-3">
              <span className="hidden sm:inline">Thème actuel</span>
              <span className="sm:hidden">Thème</span>
              <span className="ml-1">({themeItems.length})</span>
            </TabsTrigger>

            <TabsTrigger value="all" className="text-xs sm:text-sm px-2 py-3">
              <span className="hidden sm:inline">Tous les objets</span>
              <span className="sm:hidden">Tous</span>
              <span className="ml-1">({allItems.length})</span>
            </TabsTrigger>

            <TabsTrigger value="popular" className="text-xs sm:text-sm px-2 py-3">
              Populaires
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themeItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onVote={handleVote}
                  onContact={handleContact}
                />
              ))}
            </div>

            {themeItems.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border shadow-sm">
                <p className="text-gray-600 mb-4">
                  Aucun objet proposé pour ce thème.
                </p>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => handleProposeItem("empty")}
                >
                  {!user && <Lock className="w-4 h-4 mr-2" />}
                  <Plus className="w-4 h-4 mr-2" />
                  Soyez le premier à proposer un objet
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onVote={handleVote}
                  onContact={handleContact}
                />
              ))}
            </div>

            {allItems.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border shadow-sm">
                <p className="text-gray-600 mb-4">Aucun objet disponible.</p>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => handleProposeItem("empty")}
                >
                  {!user && <Lock className="w-4 h-4 mr-2" />}
                  <Plus className="w-4 h-4 mr-2" />
                  Proposer un objet
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="popular" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...allItems]
                .sort((a, b) => b.votes - a.votes)
                .slice(0, 6)
                .map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onVote={handleVote}
                    onContact={handleContact}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* THEMES A VENIR : cards propres + couleurs safe */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
          Thèmes à venir
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingThemes.slice(0, 3).map(({theme, startDate}) => {
            const Icon = iconMap[theme.icon] || Calendar;
            const colorKey = (theme.color as ThemeColor) || "slate";
            const c = themeColorClasses[colorKey] || themeColorClasses.slate;

            return (
              <Card
                key={theme.id}
                className={`hover:shadow-md transition-shadow border ${c.border}`}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${c.iconBg}`}>
                      <Icon className={`w-5 h-5 ${c.iconText}`} />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${c.chip}`}>
                      {new Date(startDate).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>

                  <div>
                    <CardTitle className="text-lg sm:text-xl">
                      {theme.name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {theme.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <AddItemDialog
        open={addItemDialogOpen}
        onOpenChange={setAddItemDialogOpen}
        themeId={currentTheme.id}
        themeName={currentTheme.name}
        preselectTheme={dialogSource === "hero"}
        onItemAdded={loadItems}
      />
    </div>
  );
};
