import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const GestionCookies: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Politique de Gestion des Cookies</h1>

      <Card>
        <CardHeader>
          <CardTitle>1. Qu'est-ce qu'un cookie ?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web. 
            Il permet de collecter des informations relatives à votre navigation et de vous proposer des services adaptés.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Types de cookies utilisés</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <h3 className="font-semibold text-gray-900 mt-4">Cookies essentiels</h3>
          <p>
            Ces cookies sont indispensables au fonctionnement du site. Ils permettent d'utiliser les fonctionnalités principales 
            comme la connexion à votre compte, la mémorisation de votre panier, etc.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Cookie d'authentification :</strong> maintient votre session active</li>
            <li><strong>Cookie de préférence :</strong> mémorise vos choix (langue, thème)</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4">Cookies analytiques</h3>
          <p>
            Ces cookies nous permettent de mesurer l'audience du site et d'analyser la navigation pour améliorer nos services.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Google Analytics :</strong> statistiques de visite anonymisées</li>
            <li><strong>Données collectées :</strong> pages visitées, durée de session, source de trafic</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mt-4">Cookies fonctionnels</h3>
          <p>
            Ces cookies améliorent votre expérience en mémorisant vos préférences.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Mémorisation de votre localisation</li>
            <li>Préférences d'affichage</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Durée de conservation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Cookies de session :</strong> supprimés à la fermeture du navigateur</li>
            <li><strong>Cookies d'authentification :</strong> 30 jours</li>
            <li><strong>Cookies analytiques :</strong> 13 mois maximum</li>
            <li><strong>Cookies de préférence :</strong> 12 mois</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Gestion des cookies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Vous pouvez à tout moment gérer vos préférences en matière de cookies :
          </p>

          <h3 className="font-semibold text-gray-900 mt-4">Via votre navigateur</h3>
          <p>Vous pouvez configurer votre navigateur pour :</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Être informé de la présence de cookies</li>
            <li>Accepter ou refuser les cookies au cas par cas</li>
            <li>Refuser systématiquement tous les cookies</li>
            <li>Supprimer les cookies existants</li>
          </ul>

          <div className="mt-4 space-y-2">
            <p><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</p>
            <p><strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies</p>
            <p><strong>Safari :</strong> Préférences → Confidentialité → Cookies</p>
            <p><strong>Edge :</strong> Paramètres → Cookies et autorisations</p>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800">
              <strong>⚠️ Attention :</strong> La désactivation de certains cookies peut limiter votre accès à certaines fonctionnalités du site.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Cookies tiers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Notre site peut contenir des cookies provenant de services tiers :
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Google Analytics :</strong> pour les statistiques de visite</li>
            <li><strong>Firebase :</strong> pour l'authentification et la base de données</li>
          </ul>
          <p>
            Ces services ont leurs propres politiques de confidentialité et de cookies. Nous vous invitons à les consulter.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Consentement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Conformément à la réglementation, votre consentement est requis pour le dépôt de cookies non essentiels. 
            Vous pouvez retirer votre consentement à tout moment via les paramètres de votre navigateur.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Pour toute question concernant notre politique de cookies, contactez-nous à : 
            <a href="mailto:contact@secondlife.fr" className="text-emerald-600 hover:underline ml-1">contact@secondlife.fr</a>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. Mise à jour</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Cette politique peut être modifiée à tout moment. Nous vous invitons à la consulter régulièrement.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Dernière mise à jour : 26 janvier 2026
          </p>
        </CardContent>
      </Card>
    </div>
  );
};