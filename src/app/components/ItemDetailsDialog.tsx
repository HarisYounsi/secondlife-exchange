import React from 'react';
import { Item } from '../data/items';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { MessageCircle, X } from 'lucide-react';

interface ItemDetailsDialogProps {
  item: Item | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContact: (item: Item) => void;
  currentUserId?: string;
}

const conditionLabels = {
  excellent: 'Excellent - Comme neuf',
  good: 'Bon - Quelques traces d\'usage',
  fair: 'Correct - Signes d\'usure visibles',
};

const conditionColors = {
  excellent: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  good: 'bg-amber-100 text-amber-700 border-amber-200',
  fair: 'bg-slate-100 text-slate-700 border-slate-200',
};

export const ItemDetailsDialog: React.FC<ItemDetailsDialogProps> = ({
  item,
  open,
  onOpenChange,
  onContact,
  currentUserId,
}) => {
  if (!item) return null;

  const isExchanged = item.status === 'exchanged';
  const isOwnItem = item.userId === currentUserId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 gap-0 bg-white">
        {/* Header avec bouton fermer */}
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-gray-900 m-0">
            {item.title}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Image professionnelle - fond blanc, image entière visible */}
          <div className="w-full rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-auto max-h-[500px] object-contain mx-auto"
            />
          </div>

          {/* Badge État */}
          <div>
            <Badge className={`${conditionColors[item.condition]} border px-4 py-2 text-sm font-medium`}>
              {conditionLabels[item.condition]}
            </Badge>
          </div>

          {/* Description - TEXTE NOIR, lisible */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 mb-3">Description</h3>
            <p className="text-gray-900 text-base leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>
          </div>

          {/* Vendeur - Card professionnelle */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Vendeur</h3>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 ring-2 ring-emerald-500">
                <AvatarImage src={item.userAvatar} />
                <AvatarFallback className="bg-emerald-500 text-white text-xl font-semibold">
                  {item.userName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg text-gray-900">{item.userName}</p>
                <p className="text-sm text-gray-600">
                  Membre depuis {new Date(item.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Boutons d'action - Grands et clairs */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1 h-12 text-base font-medium border-gray-300 hover:bg-gray-50"
              onClick={() => onOpenChange(false)}
            >
              Fermer
            </Button>
            <Button
              className="flex-1 h-12 text-base font-medium bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-gray-300"
              onClick={() => {
                onOpenChange(false);
                onContact(item);
              }}
              disabled={isExchanged || isOwnItem}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {isExchanged ? 'Objet déjà échangé' : isOwnItem ? 'Votre objet' : 'Contacter le vendeur'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};