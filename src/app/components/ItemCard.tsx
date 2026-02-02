import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ThumbsUp, MessageCircle, CheckCircle2 } from "lucide-react";
import { Item } from "../data/items";
import { ItemDetailsDialog } from "./ItemDetailsDialog";
import { useAuth } from "../contexts/AuthContext";  // ✅ AJOUTÉ

interface ItemCardProps {
  item: Item;
  onVote?: (itemId: string) => void;
  onContact?: (item: Item) => void;
}

const conditionStyles: Record<string, string> = {
  excellent: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  good: "bg-amber-100 text-amber-800 border border-amber-200",
  fair: "bg-slate-100 text-slate-700 border border-slate-200",
};

const conditionLabels: Record<string, string> = {
  excellent: "Excellent",
  good: "Bon",
  fair: "Correct",
};

export const ItemCard: React.FC<ItemCardProps> = ({ item, onVote, onContact }) => {
  const { user } = useAuth();  // ✅ AJOUTÉ
  const isExchanged = item.status === "exchanged";
  const conditionClass =
    conditionStyles[item.condition] ||
    "bg-slate-100 text-slate-700 border border-slate-200";
  const conditionLabel = conditionLabels[item.condition] || "État";

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card
        className={[
          "group overflow-hidden rounded-2xl border bg-white",
          "shadow-sm hover:shadow-md transition-all cursor-pointer",
          isExchanged ? "opacity-80" : "",
        ].join(" ")}
        onClick={() => {
          console.log("Card cliquée !", item.title);
          setSelectedItem(item);
          setShowDetails(true);
        }}
      >
        {/* IMAGE */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />

          {/* Badge état */}
          <div className="absolute left-3 top-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${conditionClass}`}>
              {conditionLabel}
            </span>
          </div>

          {/* Pastille votes */}
          <div className="absolute right-3 top-3">
            <div className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800 shadow-sm">
              <ThumbsUp className="h-3.5 w-3.5 text-emerald-600" />
              <span>{item.votes}</span>
            </div>
          </div>

          {/* Overlay échangé */}
          {isExchanged && (
            <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
              <div className="rounded-full bg-white px-4 py-2 text-gray-900 flex items-center gap-2 font-semibold shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Échangé</span>
              </div>
            </div>
          )}
        </div>

        {/* HEADER */}
        <CardHeader className="pb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {item.description}
          </p>
        </CardHeader>

        {/* USER */}
        <CardContent className="pb-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 ring-2 ring-emerald-100">
              <AvatarImage src={item.userAvatar} alt={item.userName} />
              <AvatarFallback>{item.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.userName}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(item.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        </CardContent>

        {/* ACTIONS */}
        <CardFooter className="border-t bg-white p-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
              onVote?.(item.id);
            }}
            disabled={isExchanged}
          >
            <ThumbsUp className="w-4 h-4 mr-2 text-emerald-600" />
            Voter
          </Button>

          <Button
            size="sm"
            className={[
              "flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700",
              "disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed",
            ].join(" ")}
            onClick={(e) => {
              e.stopPropagation();
              onContact?.(item);
            }}
            disabled={isExchanged}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {isExchanged ? "Indisponible" : "Contacter"}
          </Button>
        </CardFooter>
      </Card>

      <ItemDetailsDialog
        item={selectedItem}
        open={showDetails}
        onOpenChange={setShowDetails}
        onContact={onContact || (() => { })}
        currentUserId={user?.uid}  // ✅ CORRIGÉ
      />
    </>
  );
};