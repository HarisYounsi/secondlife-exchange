import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../contexts/AuthContext';
import { addItemToFirestore } from '../../services/itemsService';
import { generateDescription } from '../../services/aiService';
import { themes } from '../data/themes';
import { toast } from 'sonner';
import { Upload, Sparkles } from 'lucide-react';

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  themeId?: string;
  themeName?: string;
  preselectTheme?: boolean;
  onItemAdded: () => void;
}

export const AddItemDialog: React.FC<AddItemDialogProps> = ({
  open,
  onOpenChange,
  themeId,
  themeName,
  preselectTheme = false,
  onItemAdded
}) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState<'excellent' | 'good' | 'fair'>('good');
  const [selectedTheme, setSelectedTheme] = useState<string>(
    preselectTheme && themeId ? themeId : 'none'
  );
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedTheme(preselectTheme && themeId ? themeId : 'none');
    }
  }, [open, preselectTheme, themeId]);

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

    if (!selectedTheme || selectedTheme === 'none') {
      toast.error('Veuillez sélectionner une catégorie/thème');
      return;
    }

    setIsGeneratingAI(true);

    try {
      const themeName = themes.find(t => t.id === selectedTheme)?.name || 'Général';
      
      const generatedDesc = await generateDescription({
        title,
        theme: themeName,
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
    
    if (!user) {
      toast.error('Vous devez être connecté pour proposer un objet');
      return;
    }

    if (!title || !description) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsLoading(true);
    
    try {
      await addItemToFirestore({
        title,
        description,
        condition,
        category: 'general',
        image: imagePreview || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        themeId: selectedTheme,
        userId: user.uid,
        userName: user.displayName || 'Utilisateur',
        userAvatar: user.photoURL || ''
      });

      toast.success('Objet ajouté avec succès !');
      
      // Reset form
      setTitle('');
      setDescription('');
      setCondition('good');
      setSelectedTheme(preselectTheme && themeId ? themeId : 'none');
      setImagePreview('');
      onItemAdded();
      onOpenChange(false);
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de l\'objet');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-white p-4 sm:p-6">
        <DialogHeader className="space-y-1 sm:space-y-2">
          <DialogTitle className="text-xl sm:text-2xl text-gray-900">Proposer un objet</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Ajoutez les détails de l'objet que vous souhaitez échanger
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Sélection du thème */}
          <div className="space-y-1.5">
            <Label htmlFor="theme" className="text-sm font-medium text-gray-900">
              Catégorie / Thème
            </Label>
            <Select value={selectedTheme} onValueChange={setSelectedTheme}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900 h-9 sm:h-10 text-sm">
                <SelectValue placeholder="Choisissez un thème" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="none">Aucun thème spécifique</SelectItem>
                {themes.map(theme => (
                  <SelectItem key={theme.id} value={theme.id}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              {preselectTheme 
                ? `Thème "${themeName}" pré-sélectionné, vous pouvez le modifier`
                : 'Choisissez le thème correspondant à votre objet'
              }
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-sm font-medium text-gray-900">
              Titre de l'objet *
            </Label>
            <Input
              id="title"
              placeholder="Ex: iPhone 12 Pro - 128GB"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-9 sm:h-10 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="description" className="text-sm font-medium text-gray-900">
                Description *
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGenerateDescription}
                disabled={isGeneratingAI || isLoading || !title || !selectedTheme || selectedTheme === 'none'}
                className="h-7 text-xs gap-1.5"
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
              rows={3}
              className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm resize-none"
            />
            <p className="text-xs text-gray-500">
              Vous pouvez écrire vous-même ou utiliser l'IA pour générer une description
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="condition" className="text-sm font-medium text-gray-900">
              État *
            </Label>
            <Select value={condition} onValueChange={(value: any) => setCondition(value)}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900 h-9 sm:h-10 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="excellent">Excellent - Comme neuf</SelectItem>
                <SelectItem value="good">Bon - Quelques traces d'usage</SelectItem>
                <SelectItem value="fair">Correct - Signes d'usure visibles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="image" className="text-sm font-medium text-gray-900">
              Photo de l'objet
            </Label>
            <div className="flex flex-col gap-2 sm:gap-3">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
                className="bg-white border-gray-300 text-gray-900 text-sm h-9 sm:h-10"
              />
              {imagePreview ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-300">
                  <img 
                    src={imagePreview} 
                    alt="Aperçu" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full aspect-video rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-400 mb-1 sm:mb-2" />
                    <p className="text-xs sm:text-sm text-gray-500">Ajoutez une photo</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-9 sm:h-10 text-sm"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-9 sm:h-10 text-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Ajout...' : 'Proposer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};