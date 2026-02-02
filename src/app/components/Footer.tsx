import React from "react";
import logo from "../../assets/logo.png";

interface FooterProps {
  onLegalClick: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({onLegalClick}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={logo}
                alt="SecondLife"
                className="h-10 w-auto"
              />
              <span className="text-lg font-semibold text-gray-900">
                SecondLife
              </span>
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              La plateforme d'échange d'objets pour une consommation responsable
              et circulaire.
            </p>
          </div>

          {/* Liens Légaux */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Légal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button
                  onClick={() => onLegalClick("mentions")}
                  className="hover:text-emerald-600 transition-colors text-left"
                >
                  Mentions légales
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLegalClick("cgu")}
                  className="hover:text-emerald-600 transition-colors text-left"
                >
                  CGU
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLegalClick("confidentialite")}
                  className="hover:text-emerald-600 transition-colors text-left"
                >
                  Politique de confidentialité
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLegalClick("cookies")}
                  className="hover:text-emerald-600 transition-colors text-left"
                >
                  Gestion des cookies
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="mailto:contact@secondlife.fr"
                  className="hover:text-emerald-600 transition-colors"
                >
                  contact@secondlife.fr
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-600 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© {currentYear} SecondLife Exchange. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
