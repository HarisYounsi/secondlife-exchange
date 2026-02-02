import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const CGU: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Conditions Générales d'Utilisation</h1>

      <Card>
        <CardHeader>
          <CardTitle>1. Objet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation 
            de la plateforme SecondLife Exchange, ainsi que les droits et obligations des utilisateurs dans ce cadre.
          </p>
          <p>
            L'utilisation de la plateforme implique l'acceptation pleine et entière des présentes CGU.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Accès à la plateforme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            La plateforme SecondLife Exchange est accessible gratuitement à tout utilisateur disposant d'un accès à internet. 
            Tous les coûts afférents à l'accès à la plateforme, que ce soient les frais matériels, logiciels ou d'accès à internet, 
            sont exclusivement à la charge de l'utilisateur.
          </p>
          <p>
            L'utilisateur non-membre n'a pas accès aux services réservés aux membres. Pour cela, il doit créer un compte en fournissant 
            les informations nécessaires.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Inscription et compte utilisateur</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Pour accéder à l'ensemble des fonctionnalités de la plateforme, l'utilisateur doit créer un compte en fournissant une adresse 
            email valide et un mot de passe.
          </p>
          <p>
            L'utilisateur s'engage à fournir des informations exactes et à les maintenir à jour. Il est responsable de la confidentialité 
            de ses identifiants de connexion.
          </p>
          <p>
            L'utilisateur peut à tout moment supprimer son compte en contactant le service client.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Services proposés</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            SecondLife Exchange permet aux utilisateurs de :
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Proposer des objets à échanger</li>
            <li>Rechercher des objets disponibles</li>
            <li>Contacter d'autres utilisateurs pour organiser des échanges</li>
            <li>Participer aux thèmes hebdomadaires</li>
            <li>Consulter leur impact écologique</li>
          </ul>
          <p>
            SecondLife Exchange agit uniquement comme intermédiaire de mise en relation. La plateforme n'est pas partie prenante 
            des échanges effectués entre utilisateurs.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Obligations des utilisateurs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>L'utilisateur s'engage à :</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Ne pas diffuser de contenus illicites, offensants ou contraires aux bonnes mœurs</li>
            <li>Respecter les droits de propriété intellectuelle</li>
            <li>Fournir des informations exactes sur les objets proposés</li>
            <li>Ne pas usurper l'identité d'un tiers</li>
            <li>Ne pas utiliser la plateforme à des fins commerciales sans autorisation</li>
            <li>Respecter les autres utilisateurs</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Responsabilité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            SecondLife Exchange ne peut être tenue responsable des dommages résultant :
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Des échanges effectués entre utilisateurs</li>
            <li>De l'inexactitude des informations fournies par les utilisateurs</li>
            <li>D'une utilisation frauduleuse ou abusive de la plateforme</li>
            <li>D'une interruption du service, quelle qu'en soit la cause</li>
          </ul>
          <p>
            Les échanges se font sous l'entière responsabilité des utilisateurs. Il est recommandé de prendre toutes les précautions 
            nécessaires lors des rencontres physiques.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Modification des CGU</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            SecondLife Exchange se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés 
            de ces modifications par email ou via la plateforme.
          </p>
          <p>
            L'utilisation de la plateforme après modification des CGU vaut acceptation des nouvelles conditions.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. Droit applicable</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Les présentes CGU sont régies par le droit français. En cas de litige, et après une tentative de résolution amiable, 
            les tribunaux français seront seuls compétents.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};