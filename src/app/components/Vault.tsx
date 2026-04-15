"use client";

import { motion } from "framer-motion";

interface VaultProps {
  isUnlocked: boolean;
}

export default function Vault({ isUnlocked }: VaultProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isUnlocked ? 1 : 0, scale: isUnlocked ? 1.5 : 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 bg-rose-600/20 blur-3xl rounded-full z-0"
      />

      <motion.div
        animate={{
          scale: isUnlocked ? 1.05 : 1,
          borderColor: isUnlocked ? "rgba(225, 29, 72, 0.4)" : "rgba(255, 255, 255, 0.1)",
          backgroundColor: isUnlocked ? "rgba(15, 15, 15, 0.9)" : "rgba(20, 20, 20, 0.8)",
        }}
        transition={{ duration: 1.5 }}
        className="relative z-10 w-40 h-40 md:w-48 md:h-48 bg-gradient-to-b from-neutral-900 to-black border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center justify-center overflow-hidden"
      >
        <motion.div
          animate={{ opacity: isUnlocked ? 0 : 1, y: isUnlocked ? -20 : 0 }}
          transition={{ duration: 1 }}
          className="w-4 h-6 rounded-t-full bg-white/10 border border-white/20 relative shadow-inner"
        >
           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full"></div>
           <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[6px] border-t-black"></div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: isUnlocked ? 1 : 0 }}
           transition={{ duration: 1.5, delay: 0.8 }}
           className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
           <span className="text-rose-500/70 text-[10px] tracking-[0.4em] uppercase font-sans">
             Desbloqueado
           </span>
        </motion.div>
      </motion.div>
    </div>
  );
}