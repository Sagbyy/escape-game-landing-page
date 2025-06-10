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
    alert("Formulaire soumis:" +  formData)
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

          </div>

          {/* Formulaire de Contact */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-wide">Nous Contacter</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
    
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
