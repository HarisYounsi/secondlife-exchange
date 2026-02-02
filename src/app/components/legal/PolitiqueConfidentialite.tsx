import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const PolitiqueConfidentialite: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Politique de Confidentialité</h1>

      <Card>
        <CardHeader>
          <CardTitle>1. Introduction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            SecondLife Exchange accorde une grande importance à la protection de vos données personnelles. Cette politique de confidentialité 
            vous informe sur la manière dont nous collectons, utilisons et protégeons vos données conformément au Règlement Général sur la 
            Protection des Données (RGPD).
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Responsable du traitement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            <strong>Responsable :</strong> SecondLife Exchange<br />
            <strong>Email :</strong> contact@secondlife.fr<br />
            <strong>Adresse :</strong> [Adresse de l'entreprise]
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Données collectées</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>Nous collectons les données suivantes :</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Données d'identification :</strong> nom, prénom, adresse email</li>
            <li><strong>Données de connexion :</strong> adresse IP, logs de connexion</li>
            <li><strong>Données de profil :</strong> photo de profil, ville</li>
            <li><strong>Données d'utilisation :</strong> objets proposés, échanges effectués, interactions sur la plateforme</li>
            <li><strong>Cookies :</strong> données de navigation (voir politique cookies)</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Finalités du traitement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Créer et gérer votre compte utilisateur</li>
            <li>Permettre la mise en relation entre utilisateurs</li>
            <li>Améliorer nos services et l'expérience utilisateur</li>
            <li>Envoyer des communications relatives au service</li>
            <li>Assurer la sécurité de la plateforme</li>
            <li>Réaliser des statistiques anonymisées</li>
            <li>Respecter nos obligations légales</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Base légale du traitement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>Le traitement de vos données repose sur :</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>L'exécution du contrat :</strong> pour fournir nos services</li>
            <li><strong>Le consentement :</strong> pour l'envoi de communications marketing</li>
            <li><strong>L'intérêt légitime :</strong> pour améliorer nos services et assurer la sécurité</li>
            <li><strong>L'obligation légale :</strong> pour respecter les réglementations en vigueur</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Destinataires des données</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>Vos données peuvent être transmises à :</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Les autres utilisateurs de la plateforme (nom, photo de profil, objets proposés)</li>
            <li>Nos prestataires techniques (hébergement, analytics)</li>
            <li>Les autorités compétentes sur requête légale</li>
          </ul>
          <p>
            Vos données ne sont jamais vendues à des tiers à des fins commerciales.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Durée de conservation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Vos données sont conservées pendant la durée de votre utilisation de la plateforme, puis :
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Compte actif :</strong> pendant toute la durée d'utilisation</li>
            <li><strong>Après suppression du compte :</strong> 30 jours (sauf obligations légales)</li>
            <li><strong>Données de connexion :</strong> 12 mois</li>
            <li><strong>Données comptables :</strong> 10 ans</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. Vos droits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Droit d'accès :</strong> obtenir la confirmation que vos données sont traitées et en recevoir une copie</li>
            <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
            <li><strong>Droit à l'effacement :</strong> supprimer vos données dans certaines conditions</li>
            <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
            <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
            <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
            <li><strong>Droit de retirer votre consentement :</strong> à tout moment</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@secondlife.fr" className="text-emerald-600 hover:underline">contact@secondlife.fr</a>
          </p>
          <p>
            Vous pouvez également déposer une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">www.cnil.fr</a>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>9. Sécurité des données</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre 
            tout accès non autorisé, perte, destruction ou altération :
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Chiffrement des données sensibles (mots de passe)</li>
            <li>Connexions sécurisées (HTTPS)</li>
            <li>Accès restreint aux données personnelles</li>
            <li>Sauvegardes régulières</li>
            <li>Surveillance des accès</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>10. Cookies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Pour plus d'informations sur l'utilisation des cookies, veuillez consulter notre 
            <a href="#" className="text-emerald-600 hover:underline ml-1">Politique de gestion des cookies</a>.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>11. Modifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
            Toute modification sera publiée sur cette page avec une date de mise à jour.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Dernière mise à jour : 26 janvier 2026
          </p>
        </CardContent>
      </Card>
    </div>
  );
};