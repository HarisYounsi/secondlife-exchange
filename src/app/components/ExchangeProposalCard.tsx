import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Repeat, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface ExchangeProposalCardProps {
  proposedItem: {
    title: string;
    description: string;
    condition: string;
    image: string;
  };
  requestedItem: {
    title: string;
    image?: string;
  };
  proposerName: string;
  status: 'pending' | 'accepted' | 'refused';
  refusalReason?: string;
  isReceiver: boolean;
  onAccept?: () => void;
  onRefuse?: (reason: string) => void;
}

export const ExchangeProposalCard: React.FC<ExchangeProposalCardProps> = ({
  proposedItem,
  requestedItem,
  proposerName,
  status,
  refusalReason,
  isReceiver,
  onAccept,
  onRefuse
}) => {
  const [showRefuseDialog, setShowRefuseDialog] = useState(false);
  const [refuseReason, setRefuseReason] = useState('');

  const handleRefuse = () => {
    if (onRefuse) {
      onRefuse(refuseReason);
    }
    setShowRefuseDialog(false);
    setRefuseReason('');
  };

  const conditionLabels = {
    excellent: 'Excellent',
    good: 'Bon',
    fair: 'Correct'
  };

  return (
    <>
      <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-lg">
        <CardContent className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <Repeat className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-emerald-900">Proposition d'échange</h3>
              <p className="text-sm text-emerald-700">{proposerName} propose un échange</p>
            </div>
            {status === 'pending' && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                En attente
              </Badge>
            )}
            {status === 'accepted' && (
              <Badge className="bg-green-100 text-green-800 border-green-300">
                ✓ Accepté
              </Badge>
            )}
            {status === 'refused' && (
              <Badge className="bg-red-100 text-red-800 border-red-300">
                ✗ Refusé
              </Badge>
            )}
          </div>

          {/* Exchange visual */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
            {/* Proposed item */}
            <div className="bg-white rounded-lg p-3 border-2 border-emerald-300">
              <img
                src={proposedItem.image}
                alt={proposedItem.title}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h4 className="font-semibold text-sm truncate">{proposedItem.title}</h4>
              <p className="text-xs text-gray-600 line-clamp-2 mb-1">{proposedItem.description}</p>
              <Badge variant="outline" className="text-xs">
                {conditionLabels[proposedItem.condition as keyof typeof conditionLabels]}
              </Badge>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center">
              <Repeat className="w-8 h-8 text-emerald-600" />
              <span className="text-xs text-gray-500 mt-1">contre</span>
            </div>

            {/* Requested item */}
            <div className="bg-white rounded-lg p-3 border-2 border-blue-300">
              {requestedItem.image && (
                <img
                  src={requestedItem.image}
                  alt={requestedItem.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
              )}
              <h4 className="font-semibold text-sm truncate">{requestedItem.title}</h4>
            </div>
          </div>

          {/* Refusal reason */}
          {status === 'refused' && refusalReason && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
              <p className="text-sm text-red-900">
                <strong>Raison du refus :</strong> {refusalReason}
              </p>
            </div>
          )}

          {/* Actions (only for receiver and pending) */}
          {isReceiver && status === 'pending' && onAccept && onRefuse && (
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setShowRefuseDialog(true)}
                variant="outline"
                className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-2" />
                Refuser
              </Button>
              <Button
                onClick={onAccept}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                <Check className="w-4 h-4 mr-2" />
                Accepter l'échange
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Refuse Dialog */}
      <Dialog open={showRefuseDialog} onOpenChange={setShowRefuseDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Refuser la proposition</DialogTitle>
            <DialogDescription className="text-gray-600 text-base">
              Vous pouvez expliquer pourquoi vous refusez cet échange (optionnel)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="reason" className="text-gray-900 font-semibold text-base mb-2 block">
                Raison du refus (optionnel)
              </Label>
              <Textarea
                id="reason"
                placeholder="Ex: Je cherche un objet en meilleur état..."
                value={refuseReason}
                onChange={(e) => setRefuseReason(e.target.value)}
                rows={3}
                className="mt-2 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowRefuseDialog(false)}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Annuler
              </Button>
              <Button
                onClick={handleRefuse}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Confirmer le refus
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};