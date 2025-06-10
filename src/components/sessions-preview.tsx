import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const sessions = [
  {
    id: "escape-paris",
    title: "Escape Paris",
    description:
      "Vous êtes un agent de police chargé de résoudre un crime. Vous devez trouver le coupable avant qu'il ne s'échappe.",
    duration: "60 min",
    players: "3-6",
    difficulty: "Moyen",
    image: "/escape-paris.jpg",
  },
  {
    id: "escape-time-cops",
    title: "Escape Time Cops",
    description:
      "Vous êtes un agent de police chargé de résoudre un crime. Vous devez trouver le coupable avant qu'il ne s'échappe.",
    duration: "75 min",
    players: "4-8",
    difficulty: "Difficile",
    image: "/escape-time-cops.jpg",
  },
  {
    id: "jack-the-ripper",
    title: "Jack The Ripper",
    description:
      "Vous êtes un agent de police chargé de résoudre un crime. Vous devez trouver le coupable avant qu'il ne s'échappe.",
    duration: "90 min",
    players: "2-5",
    difficulty: "Expert",
    image: "/jack-the-ripper.jpg",
  },
  {
    id: "opera",
    title: "Opera",
    description:
      "Vous êtes un agent de police chargé de résoudre un crime. Vous devez trouver le coupable avant qu'il ne s'échappe.",
    duration: "60 min",
    players: "4-10",
    difficulty: "Moyen",
    image: "/opera.jpg",
  },
];

export default function SessionsPreview() {
  const [currentSession, setCurrentSession] = useState(0);

  return (
    <section
      id="sessions"
      className="py-20 bg-gradient-to-b from-black to-red-950/10"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl font-bold text-red-600 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Choisissez votre cauchemar
          </motion.h2>
          <motion.p
            className="text-xl text-red-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {
              "Quatre expériences terrifiantes conçues pour tester votre courage, votre intelligence et votre santé mentale. Chaque session offre un voyage unique dans le noir."
            }
          </motion.p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <motion.button
            onClick={() =>
              setCurrentSession((prev) =>
                prev > 0 ? prev - 1 : sessions.length - 1
              )
            }
            className="absolute -left-16 top-1/2 -translate-y-1/2 bg-red-900/80 hover:bg-red-800 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon icon="mdi:chevron-left" className="h-6 w-6" />
          </motion.button>

          <motion.button
            onClick={() =>
              setCurrentSession((prev) =>
                prev < sessions.length - 1 ? prev + 1 : 0
              )
            }
            className="absolute -right-16 top-1/2 -translate-y-1/2 bg-red-900/80 hover:bg-red-800 text-white p-3 rounded-full backdrop-blur-sm transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon icon="mdi:chevron-right" className="h-6 w-6" />
          </motion.button>

          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSession}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                <Card className="bg-red-950/20 border-red-900/30 overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-96 md:h-auto">
                      <img
                        src={
                          sessions[currentSession].image || "/placeholder.svg"
                        }
                        alt={sessions[currentSession].title}
                        className="object-cover"
                      />
                      <div className="absolute inset-0" />
                      <Badge className="absolute top-4 right-4 bg-red-700 text-white">
                        {sessions[currentSession].difficulty}
                      </Badge>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CardTitle className="text-3xl text-red-400 flex items-center gap-2 mb-4">
                          <Icon icon="mdi:skull" className="h-8 w-8" />
                          {sessions[currentSession].title}
                        </CardTitle>
                        <CardDescription className="text-red-200 text-lg leading-relaxed mb-6">
                          {sessions[currentSession].description}
                        </CardDescription>
                      </motion.div>

                      <motion.div
                        className="flex justify-between items-center mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center gap-6 text-red-300">
                          <div className="flex items-center gap-2">
                            <Icon icon="mdi:clock" className="h-5 w-5" />
                            {sessions[currentSession].duration}
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon icon="mdi:users" className="h-5 w-5" />
                            {sessions[currentSession].players} players
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1"
                        >
                          <Button className="w-full text-white bg-red-700 hover:bg-red-800">
                            Réserver cette session
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            className="border-red-600 text-red-400 hover:bg-red-900/20"
                          >
                            En savoir plus
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {sessions.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSession(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSession ? "bg-red-600" : "bg-red-900/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
