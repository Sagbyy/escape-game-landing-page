import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function Introduction() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-screen object-cover opacity-30"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <motion.div
        className="relative z-10 text-center space-y-6 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex items-center justify-center space-x-4 mb-8"
          variants={itemVariants}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
          ></motion.div>
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-red-600 tracking-wider"
            variants={itemVariants}
          >
            LA MAISON
          </motion.h1>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
            }}
          ></motion.div>
        </motion.div>
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white tracking-wide"
          variants={itemVariants}
        >
          HORRIFIQUE
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl text-red-200 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          {
            "Défiez vos peurs. Quatre expériences immersives vous attendent. Vous êtes prêt à vous lancer ?"
          }
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 text-lg"
            >
              Voir les sessions
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-900/20 px-8 py-4 text-lg"
            >
              Réserver une session
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
