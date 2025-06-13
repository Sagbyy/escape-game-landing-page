"use client"
import { Icon } from "@iconify/react"

export default function About() {


    return (
        <section className="py-16 bg-black from-black to-red-950/10">
            <div className="max-w-6xl mx-auto px-4">

                {/* Texte de présentation */}
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        À propos de <span className="text-red-500">Maison Horifique</span>
                    </h2>

                    <div className="w-20 h-1 bg-red-500 mx-auto mb-8"></div>

                    <div className="space-y-6 text-gray-300 leading-relaxed">
                        <p className="text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore veritatis veniam iusto nemo optio. Libero
                            voluptates asperiores, nihil ullam ea aperiam reiciendis. Sit reprehenderit doloremque dolorum blanditiis
                            dolorem rem numquam.
                        </p>

                        <p className="text-lg">
                            Nous sommes une entreprise passionnée par l'excellence et l'innovation. Notre équipe dédiée travaille
                            chaque jour pour vous offrir les meilleurs services et produits, en respectant nos valeurs fondamentales
                            de <span className="text-red-400 font-semibold">qualité</span>, d'
                            <span className="text-red-400 font-semibold">intégrité</span> et de{" "}
                            <span className="text-red-400 font-semibold">satisfaction client</span>.
                        </p>

                        <p className="text-lg">
                            Découvrez notre histoire, nos valeurs et notre vision pour l'avenir. Nous sommes fiers de faire partie de
                            votre parcours et nous nous engageons à continuer à évoluer pour mieux vous servir.
                        </p>
                    </div>

                    {/* Call to action simple */}
                    <div className="mt-10">
                        <a
                            href="/contact"
                            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/25 hover:scale-105"
                        >
                            <span>Nous contacter</span>
                            <Icon icon="material-symbols:arrow-forward" width="18" height="18" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
