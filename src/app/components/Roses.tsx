"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Agregué un par de pétalos más para cubrir toda la pantalla completa
const fallingPetals = [
  { id: 1, left: "15%", delay: 0, duration: 12, size: 20 },
  { id: 2, left: "80%", delay: 2, duration: 15, size: 25 },
  { id: 3, left: "40%", delay: 5, duration: 10, size: 15 },
  { id: 4, left: "65%", delay: 1, duration: 14, size: 30 },
  { id: 5, left: "25%", delay: 4, duration: 11, size: 18 },
  { id: 6, left: "90%", delay: 7, duration: 13, size: 22 },
  { id: 7, left: "5%", delay: 3, duration: 16, size: 24 },
  { id: 8, left: "55%", delay: 6, duration: 12, size: 16 },
];

export default function Roses() {
  useEffect(() => {
    const audio = new Audio("/20-rosas.mp3");
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio autoplay bloqueado por el navegador", e));
    
    return () => {
      audio.pause();
    };
  }, []);

  return (
    // Quitamos el overflow-hidden de aquí para no recortar el brillo
    <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 md:pt-12">
      
      {/* Sistema de Pétalos a Pantalla Completa (Usamos 'fixed' y 'w-screen h-screen') */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden w-screen h-screen">
        {fallingPetals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ opacity: 0, y: -50, rotate: 0 }}
            animate={{
              opacity: [0, 0.7, 0], // Aparece suavemente y se desvanece antes de llegar abajo
              y: '100vh',
              rotate: 360,
              x: [0, Math.sin(petal.id) * 30, 0] // Balanceo sutil como una hoja al caer
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute rounded-tl-full rounded-br-full bg-rose-700/60 blur-[3px] shadow-[0_0_10px_rgba(225,29,72,0.5)]"
            style={{ 
              left: petal.left, 
              width: petal.size, 
              height: petal.size,
              border: '1px solid rgba(150,0,0,0.2)'
            }}
          />
        ))}
      </div>

      {/* Brillo mágico (ahora se difuminará correctamente sin formar un cuadrado) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
        className="absolute w-80 h-80 md:w-[500px] md:h-[500px] bg-rose-600/15 blur-[80px] md:blur-[100px] rounded-full z-0 pointer-events-none"
      />

      {/* Ramo de Rosas (Aparición + Respiración Continua) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 2.5, 
          ease: [0.25, 0.1, 0.25, 1] 
        }}
        className="relative w-[90vw] max-w-[500px] h-[60vh] max-h-[600px] z-10"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }} // Respiración del ramo
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2.5 
          }}
          className="w-full h-full relative"
        >
          <Image
            src="/ramo-rosas.png" 
            alt="Ramo de 20 Rosas Rojas para Aracely"
            fill
            className="object-contain drop-shadow-[0_15px_25px_rgba(225,29,72,0.15)] filter contrast-110 saturate-110"
            priority
          />
        </motion.div>
      </motion.div>
      
    </div>
  );
}