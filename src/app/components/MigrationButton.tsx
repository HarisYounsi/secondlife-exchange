import React, { useState } from 'react';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';
import { runFullMigration } from '../../services/migrationScript';

export const MigrationButton: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);

  const handleMigration = async () => {
    if (!confirm('Voulez-vous migrer les données ?\nCela va mettre à jour tous les utilisateurs et objets.')) {
      return;
    }

    setIsRunning(true);
    
    try {
      await runFullMigration();
      alert('Migration réussie ! Rafraîchissez la page.');
      window.location.reload();
    } catch (error) {
      console.error('Erreur migration:', error);
      alert('Erreur lors de la migration. Voir la console.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Button
      onClick={handleMigration}
      disabled={isRunning}
      variant="outline"
      size="sm"
      className="border-orange-500 text-orange-600 hover:bg-orange-50"
    >
      <RefreshCw className={`w-4 h-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
      {isRunning ? 'Migration...' : 'Migrer DB'}
    </Button>
  );
};