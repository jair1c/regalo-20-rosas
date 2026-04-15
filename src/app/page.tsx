"use client";

import { Playfair_Display } from "next/font/google";
import { useState } from "react";
import Countdown from "./components/Countdown";
import Vault from "./components/Vault";
import Roses from "./components/Roses";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function Home() {
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showRoses, setShowRoses] = useState(false);

  // Fecha objetivo: 20 de Abril de 2026 a las 00:00:00
  const targetDate = new Date(2026, 3, 15, 0, 0, 0);

  const handleUnlock = () => {
    setIsUnlocked(true);
    // Esperamos 2.5 segundos para mostrar las rosas y el mensaje final
    setTimeout(() => {
      setShowRoses(true);
    }, 2500);
  };

  return (
    <main className={`min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden ${playfair.className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-black to-black z-0"></div>

      <div className="absolute top-10 md:top-16 w-full text-center z-20 px-4">
        <h3 className="text-white/40 uppercase tracking-[0.4em] text-xs md:text-sm font-light">
          Un instante en el tiempo
        </h3>
        <div className="w-12 md:w-16 h-[1px] bg-white/20 mx-auto mt-4"></div>
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-2xl mt-8">
        
        <div className="w-64 h-64 md:w-80 md:h-80 mb-10 flex items-center justify-center relative">
           {!showRoses ? (
             <Vault isUnlocked={isUnlocked} />
           ) : (
             <Roses />
           )}
        </div>

        <div className="text-center min-h-[8rem] flex flex-col items-center justify-center w-full z-50">
          {!timeIsUp ? (
            <div className="flex flex-col items-center animate-fade-in">
              <p className="text-rose-200/40 uppercase tracking-[0.3em] text-[10px] mb-6 font-sans">
                El tiempo se agota
              </p>
              <Countdown targetDate={targetDate} onComplete={() => setTimeIsUp(true)} />
            </div>
          ) : !isUnlocked ? (
            <button 
              onClick={handleUnlock}
              className="px-8 py-3 border border-rose-500/50 rounded-full text-rose-400 uppercase tracking-widest text-sm hover:bg-rose-900/30 hover:text-rose-300 transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.2)]"
            >
              Abrir Baúl
            </button>
          ) : (
            <div className={`flex flex-col items-center transition-opacity duration-1000 ${showRoses ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-4xl md:text-5xl text-white font-light tracking-wide mb-4 drop-shadow-2xl">
                Aracely
              </h2>
              <p className="text-rose-500/80 text-sm md:text-base font-sans tracking-widest uppercase">
                Aquí tienes tus 20 rosas
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}