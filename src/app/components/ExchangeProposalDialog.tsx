import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Upload, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { generateDescription } from '../../services/aiService';

interface ExchangeProposalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    title: string;
    description: string;
    condition: string;
    image: string;
  }) => Promise<void>;
  itemTitle: string;
}

export const ExchangeProposalDialog: React.FC<ExchangeProposalDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  itemTitle
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState<'excellent' | 'good' | 'fair'>('good');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateDescription = async () => {
    if (!title) {
      toast.error('Veuillez d\'abord remplir le titre de l\'objet');
      return;
    }

    setIsGeneratingAI(true);

    try {
      const generatedDesc = await generateDescription({
        title,
        theme: 'Échange',
        condition
      });

      setDescription(generatedDesc);
      toast.success('Description générée avec succès !');
    } catch (error) {
      console.error('Erreur génération IA:', error);
      toast.error('Erreur lors de la génération de la description');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !imagePreview) {
      toast.error('Veuillez remplir tous les champs et ajouter une photo');
      return;
    }

    setIsLoading(true);
    
    try {
      await onSubmit({
        title,
        description,
        condition,
        image: imagePreview
      });

      // Reset form
      setTitle('');
      setDescription('');
      setCondition('good');
      setImagePreview('');
      onOpenChange(false);
      
      toast.success('Proposition envoyée !');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de l\'envoi de la proposition');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Proposer un échange</DialogTitle>
          <DialogDescription>
            Décrivez l'objet que vous proposez en échange de <strong className="text-emerald-600">{itemTitle}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre de votre objet *</Label>
            <Input
              id="title"
              placeholder="Ex: iPhone 12 Pro - 128GB"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Description *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGenerateDescription}
                disabled={isGeneratingAI || isLoading || !title}
                className="h-8 text-xs gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isGeneratingAI ? 'Génération...' : 'Générer avec l\'IA'}
              </Button>
            </div>
            <Textarea
              id="description"
              placeholder="Décrivez votre objet en détail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={4}
            />
            <p className="text-xs text-gray-500">
              Vous pouvez écrire vous-même ou utiliser l'IA pour générer une description
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">État *</Label>
            <Select value={condition} onValueChange={(value: any) => setCondition(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="excellent">Excellent - Comme neuf</SelectItem>
                <SelectItem value="good">Bon - Quelques traces d'usage</SelectItem>
                <SelectItem value="fair">Correct - Signes d'usure visibles</SelectItem>
              </SelectContent >
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Photo de votre objet *</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isLoading}
            />
            {imagePreview ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-emerald-200">
                <img 
                  src={imagePreview} 
                  alt="Aperçu" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-video rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Ajoutez une photo</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={isLoading}
            >
              {isLoading ? 'Envoi...' : 'Envoyer la proposition'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};