"use client"

import { Icon } from "@iconify/react"

export default function MainFooter() {
  return (
    <footer className="bg-black text-white py-16 border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Section Informations Entreprise */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-wide flex items-center space-x-2">
              <Icon icon="material-symbols:business" width="24" height="24" />
              <span>Notre Entreprise</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Icon
                  icon="material-symbols:home-work"
                  width="20"
                  height="20"
                  className="text-red-400 mt-1 flex-shrink-0"
                />
                <div>
                  <h4 className="font-semibold text-white">Maison H Mon Pote</h4>
                  <p className="text-gray-300 text-sm">Votre partenaire de confiance depuis 2010</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Icon
                  icon="material-symbols:schedule"
                  width="20"
                  height="20"
                  className="text-red-400 mt-1 flex-shrink-0"
                />
                <div>
                  <h4 className="font-semibold text-white">Horaires d'ouverture</h4>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>Lun - Ven : 8h00 - 18h00</p>
                    <p>Sam : 9h00 - 16h00</p>
                    <p>Dim : Fermé</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Icon
                  icon="material-symbols:verified"
                  width="20"
                  height="20"
                  className="text-red-400 mt-1 flex-shrink-0"
                />
              </div>
            </div>
          </div>

          {/* Section Informations de Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-wide flex items-center space-x-2">
              <Icon icon="material-symbols:contact-phone" width="24" height="24" />
              <span>Nous Contacter</span>
            </h3>
            <div className="space-y-4">
              <a
                href="tel:+33123456789"
                className="flex items-center space-x-3 hover:text-red-400 transition-all duration-300 group"
              >
                <div className="bg-red-600 p-2 rounded-lg group-hover:bg-red-700 transition-colors duration-300">
                  <Icon icon="material-symbols:call" width="18" height="18" />
                </div>
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-gray-300 text-sm">+33 1 23 45 67 89</p>
                </div>
              </a>

              <a
                href="mailto:contact@maisonhmonpote.fr"
                className="flex items-center space-x-3 hover:text-red-400 transition-all duration-300 group"
              >
                <div className="bg-red-600 p-2 rounded-lg group-hover:bg-red-700 transition-colors duration-300">
                  <Icon icon="material-symbols:mail" width="18" height="18" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-300 text-sm">contact@maisonhmonpote.fr</p>
                </div>
              </a>

              <div className="flex items-start space-x-3">
                <div className="bg-red-600 p-2 rounded-lg">
                  <Icon icon="material-symbols:location-on" width="18" height="18" />
                </div>
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-gray-300 text-sm">
                    123 Rue de la République
                    <br />
                    75001 Paris, France
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/33123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-red-400 transition-all duration-300 group"
              >
                <div className="bg-green-600 p-2 rounded-lg group-hover:bg-green-700 transition-colors duration-300">
                  <Icon icon="ic:baseline-whatsapp" width="18" height="18" />
                </div>
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-gray-300 text-sm">Contactez-nous rapidement</p>
                </div>
              </a>
            </div>
          </div>

          {/* Section Réseaux Sociaux et Liens */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-wide flex items-center space-x-2">
              <Icon icon="material-symbols:share" width="24" height="24" />
              <span>Suivez-nous</span>
            </h3>

            {/* Réseaux sociaux */}
            <div className="space-y-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-red-400 transition-all duration-300 group border-l-2 border-transparent hover:border-red-500 pl-3"
                aria-label="Suivez-nous sur Facebook"
              >
                <Icon
                  icon="ic:baseline-facebook"
                  width="22"
                  height="22"
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-medium">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-red-400 transition-all duration-300 group border-l-2 border-transparent hover:border-red-500 pl-3"
                aria-label="Suivez-nous sur Instagram"
              >
                <Icon
                  icon="mdi:instagram"
                  width="22"
                  height="22"
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-medium">Instagram</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-red-400 transition-all duration-300 group border-l-2 border-transparent hover:border-red-500 pl-3"
                aria-label="Suivez-nous sur LinkedIn"
              >
                <Icon
                  icon="mdi:linkedin"
                  width="22"
                  height="22"
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-medium">LinkedIn</span>
              </a>
            </div>

            {/* Liens utiles */}
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Liens Utiles</h4>
              <div className="space-y-2">
                <a
                  href="/contact"
                  className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm"
                >
                  <Icon icon="material-symbols:edit" width="16" height="16" />
                  <span>Formulaire de contact</span>
                </a>
                <a
                  href="/session-details"
                  className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm"
                >
                  <Icon icon="material-symbols:info-outline" width="16" height="16" />
                  <span>Détails des sessions</span>
                </a>
                <a
                  href="/devis"
                  className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm"
                >
                  <Icon icon="material-symbols:request-quote" width="16" height="16" />
                  <span>Demander un devis</span>
                </a>
              </div>
            </div>
          </div>

          {/* Section Carte */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-wide flex items-center space-x-2">
              <Icon icon="material-symbols:map" width="24" height="24" />
              <span>Nous Trouver</span>
            </h3>

            {/* Carte Google Maps */}
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-red-600 shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.3414!3d48.8566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671d877937b0f%3A0xb975fcfa192f84d4!2sLouvre%20Museum!5e0!3m2!1sen!2sfr!4v1635789012345!5m2!1sen!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Maison H Mon Pote"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Overlay avec bouton pour ouvrir dans Google Maps */}
              <div className="absolute bottom-2 right-2">
                <a
                  href="https://maps.google.com/?q=123+Rue+de+la+République,+75001+Paris,+France"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-1"
                  aria-label="Ouvrir dans Google Maps"
                >
                  <Icon icon="material-symbols:open-in-new" width="16" height="16" />
                  <span className="text-xs font-medium">Ouvrir</span>
                </a>
              </div>
            </div>

            {/* Informations de transport */}
            <div className="space-y-2">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wide">Transport</h4>
              <div className="space-y-1 text-xs text-gray-300">
                <div className="flex items-center space-x-2">
                  <Icon icon="material-symbols:train" width="14" height="14" className="text-red-400" />
                  <span>Métro : Châtelet (Lignes 1, 4, 7, 11, 14)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon="material-symbols:directions-bus" width="14" height="14" className="text-red-400" />
                  <span>Bus : Lignes 21, 27, 38, 85</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon="material-symbols:local-parking" width="14" height="14" className="text-red-400" />
                  <span>Parking : Parking Rivoli à 200m</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Copyright et mentions légales */}
        <div className="border-t-2 border-red-900 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300 font-medium">
              <Icon icon="material-symbols:copyright" width="16" height="16" />
              <span>2025 Maison H Mon Pote. Tous droits réservés.</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="/mentions-legales" className="hover:text-red-400 transition-colors duration-300">
                Mentions légales
              </a>
              <a href="/politique-confidentialite" className="hover:text-red-400 transition-colors duration-300">
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
