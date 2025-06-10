"use client"

import type React from "react"

import { useState } from "react"
import { Icon } from "@iconify/react"

export default function MainFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de soumission du formulaire
    alert("Formulaire soumis:" + formData)
    // Reset du formulaire après soumission
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <footer className="bg-black text-white py-12 border-t-4 border-red-600">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Section Réseaux Sociaux */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-wide">Nos Réseaux :</h3>
            <div className="flex flex-col space-y-4">
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
                href="https://snapchat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-red-400 transition-all duration-300 group border-l-2 border-transparent hover:border-red-500 pl-3"
                aria-label="Suivez-nous sur Snapchat"
              >
                <Icon
                  icon="ic:baseline-snapchat"
                  width="22"
                  height="22"
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-medium">Snapchat</span>
              </a>
            </div>
          </div>

          {/* Section Détail Session */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-wide">Détail Session :</h3>
            <a
              href="/session-details"
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-red-500/25 hover:scale-105 border border-red-500"
              aria-label="Accéder aux détails de session"
            >
              <Icon icon="material-symbols:info-outline" width="18" height="18" />
              <span>Accéder au détail</span>
            </a>
          </div>

          {/* Formulaire de Contact */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-wide">Nous Contacter</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <label htmlFor="name" className="sr-only">
                  Nom
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="material-symbols:person-outline" width="20" height="20" className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Entrez votre nom"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-white placeholder-gray-400"
                />
              </div>
              <div className="relative">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="material-symbols:mail-outline" width="20" height="20" className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Entrez votre email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-white placeholder-gray-400"
                />
              </div>
              <div className="relative">
                <label htmlFor="subject" className="sr-only">
                  Sujet
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="material-symbols:subject" width="20" height="20" className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Sujet"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-white placeholder-gray-400"
                />
              </div>
              <div className="relative">
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <div className="absolute top-3 left-3 pointer-events-none">
                  <Icon icon="material-symbols:message-outline" width="20" height="20" className="text-gray-400" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Votre message"
                  rows={4}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-white placeholder-gray-400 resize-vertical"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-red-500/25 hover:scale-105 border border-red-500"
              >
                <Icon icon="material-symbols:send" width="18" height="18" />
                <span>Envoyer</span>
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t-2 border-red-900 mt-12 pt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-300 font-medium">
            <Icon icon="material-symbols:copyright" width="16" height="16" />
            <span>2025 Tous droits réservés à la maison H mon pote</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
