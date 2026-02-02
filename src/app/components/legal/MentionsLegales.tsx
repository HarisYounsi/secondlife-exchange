import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const MentionsLegales: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Mentions Légales</h1>

      <Card>
        <CardHeader>
          <CardTitle>Éditeur du site</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            <strong>Nom du site :</strong> SecondLife Exchange<br />
            <strong>Adresse :</strong> [Adresse de l'entreprise]<br />
            <strong>Email :</strong> contact@secondlife.fr<br />
            <strong>Directeur de la publication :</strong> [Nom du directeur]
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hébergement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            <strong>Hébergeur :</strong> Vercel Inc.<br />
            <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
            <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">vercel.com</a>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Propriété intellectuelle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de SecondLife Exchange, 
            à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
          </p>
          <p>
            Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement 
            interdite sans l'accord exprès par écrit de SecondLife Exchange.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Données personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), 
            vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
          </p>
          <p>
            Pour exercer ces droits, veuillez nous contacter à l'adresse : <a href="mailto:contact@secondlife.fr" className="text-emerald-600 hover:underline">contact@secondlife.fr</a>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cookies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            Le site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visites. 
            Vous pouvez gérer vos préférences de cookies via notre page dédiée.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Limitation de responsabilité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <p>
            SecondLife Exchange ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, 
            lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications, 
            soit de l'apparition d'un bug ou d'une incompatibilité.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};