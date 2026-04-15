"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
    <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 md:pt-12">
      
      {/* Brillo mágico ajustado: más grande (w-80 h-80) para acompañar el nuevo tamaño */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
        className="absolute w-80 h-80 bg-rose-600/20 blur-[80px] rounded-full z-0"
      />

      {/* Contenedor del ramo ajustado: aumentamos max-w y max-h significativamente */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 2.5, 
          ease: [0.25, 0.1, 0.25, 1] 
        }}
        className="relative w-[90vw] max-w-[500px] h-[60vh] max-h-[600px] z-10"
      >
        <Image
          src="/ramo-rosas.png" 
          alt="Ramo de 20 Rosas Rojas para Aracely"
          fill
          className="object-contain drop-shadow-[0_15px_25px_rgba(225,29,72,0.15)] filter contrast-110 saturate-110"
          priority
        />
      </motion.div>
      
    </div>
  );
}