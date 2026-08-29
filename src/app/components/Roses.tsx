"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

// Forma real de pétalo (no un rectángulo con esquinas redondeadas)
const ROSE_PETAL_PATH =
  "M12 2C7.5 5.5 4.5 11 6 17C7.3 21.5 12 23 12 23C12 23 16.7 21.5 18 17C19.5 11 16.5 5.5 12 2Z";

type Petal = {
  id: number;
  left: string;
  delay: number;
  duration: number;
  size: number;
  amp: number; // amplitud del deriva lateral (viento)
  rotateDir: 1 | -1;
  color: string;
  type: "rose" | "gyp"; // pétalo de rosa o florecilla de gipsófila (paniculata)
};

const fallingPetals: Petal[] = [
  { id: 1, left: "10%", delay: 0, duration: 13, size: 22, amp: 40, rotateDir: 1, color: "#be123c", type: "rose" },
  { id: 2, left: "82%", delay: 2.5, duration: 16, size: 26, amp: 55, rotateDir: -1, color: "#9f1239", type: "rose" },
  { id: 3, left: "38%", delay: 5.5, duration: 11, size: 14, amp: 25, rotateDir: 1, color: "#e11d48", type: "rose" },
  { id: 4, left: "66%", delay: 1, duration: 15, size: 30, amp: 60, rotateDir: -1, color: "#be123c", type: "rose" },
  { id: 5, left: "22%", delay: 4, duration: 12, size: 18, amp: 35, rotateDir: 1, color: "#e11d48", type: "rose" },
  { id: 6, left: "92%", delay: 7.5, duration: 14, size: 20, amp: 45, rotateDir: -1, color: "#9f1239", type: "rose" },
  { id: 7, left: "4%", delay: 3, duration: 17, size: 24, amp: 50, rotateDir: 1, color: "#be123c", type: "rose" },
  { id: 8, left: "52%", delay: 6, duration: 13, size: 16, amp: 30, rotateDir: -1, color: "#e11d48", type: "rose" },
  { id: 9, left: "72%", delay: 8.5, duration: 10, size: 8, amp: 20, rotateDir: 1, color: "#fdf2f8", type: "gyp" },
  { id: 10, left: "30%", delay: 2, duration: 9, size: 6, amp: 15, rotateDir: -1, color: "#ffffff", type: "gyp" },
  { id: 11, left: "58%", delay: 9, duration: 11, size: 7, amp: 18, rotateDir: 1, color: "#fdf2f8", type: "gyp" },
  { id: 12, left: "15%", delay: 5, duration: 10, size: 20, amp: 38, rotateDir: -1, color: "#e11d48", type: "rose" },
];

export default function Roses() {
  useEffect(() => {
    const audio = new Audio("/20-rosas.mp3");
    audio.volume = 0.5;
    audio.loop = true; // ¡AQUÍ ESTÁ LA MAGIA DEL LOOP INFINITO!
    audio.play().catch(e => console.log("Audio autoplay bloqueado por el navegador", e));

    return () => {
      audio.pause();
    };
  }, []);

  // Posición del puntero normalizada (-0.5 a 0.5) para el efecto de profundidad/tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [mx, my]);

  const springCfg = { stiffness: 120, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), springCfg);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), springCfg);
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), springCfg);
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [-20, 20]), springCfg);
  const bokehX = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), springCfg);
  const bokehY = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), springCfg);
  const shadowX = useSpring(useTransform(mx, [-0.5, 0.5], [18, -18]), springCfg);
  const shadowOpacity = useSpring(
    useTransform([mx, my], (latest) => {
      const [mxv, myv] = latest as number[];
      return 0.35 + (Math.abs(mxv) + Math.abs(myv)) * 0.3;
    }),
    springCfg
  );

  return (
    // Reduje el padding-top (pt-2) en móviles para que el ramo pueda subir un poco más
    <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 md:pt-12">

      {/* Sistema de Pétalos a Pantalla Completa */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden w-screen h-screen">
        {fallingPetals.map((petal) => {
          const drift = [0, petal.amp * 0.6, -petal.amp * 0.4, petal.amp * 0.8, 0];
          const tumble =
            petal.type === "rose"
              ? [0, petal.rotateDir * 130, petal.rotateDir * 250, petal.rotateDir * 380]
              : [0, petal.rotateDir * 180, petal.rotateDir * 360];
          const flutter = petal.type === "rose" ? [1, 0.35, 1, 0.45, 1] : [1, 0.7, 1, 0.7, 1];

          return (
            <motion.div
              key={petal.id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: [0, 0.85, 0.85, 0.6, 0], y: "100vh", x: drift }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute drop-shadow-[0_0_6px_rgba(225,29,72,0.35)]"
              style={{ left: petal.left, width: petal.size, height: petal.size }}
            >
              {/* Rotación/aplastamiento independiente: simula el volteo del pétalo al caer */}
              <motion.div
                animate={{ rotate: tumble, scaleX: flutter }}
                transition={{
                  duration: petal.duration * 0.6,
                  delay: petal.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full"
              >
                {petal.type === "rose" ? (
                  <svg viewBox="0 0 24 24" className="w-full h-full blur-[0.5px]">
                    <path d={ROSE_PETAL_PATH} fill={petal.color} />
                  </svg>
                ) : (
                  <div
                    className="w-full h-full rounded-full blur-[0.5px]"
                    style={{ background: petal.color, boxShadow: "0 0 4px rgba(255,255,255,0.6)" }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Brillo mágico ajustado para móviles, sigue sutilmente el cursor para dar sensación de profundidad */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
        style={{ x: glowX, y: glowY }}
        className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-rose-600/15 blur-[80px] md:blur-[100px] rounded-full z-0 pointer-events-none"
      />

      {/* Ramo de Rosas (Aparición + Respiración Continua) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        // Cambié el scale final a 1.15 para que se vea mucho más imponente
        animate={{ opacity: 1, scale: 1.15, y: 0 }}
        transition={{
          duration: 2.5,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        // Aumenté el ancho a 100vw para móviles y le di más altura
        className="relative w-[100vw] md:w-[90vw] max-w-[600px] h-[65vh] max-h-[700px] z-10"
      >
        {/* Sombra de contacto dinámica: se desplaza en sentido opuesto al tilt, como si hubiera una fuente de luz real */}
        <motion.div
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-8 md:h-12 bg-black/60 rounded-full blur-2xl pointer-events-none"
          style={{ x: shadowX, opacity: shadowOpacity }}
        />

        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-1.2, 1.2, -1.2] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
          className="w-full h-full relative"
          style={{ perspective: 1000 }}
        >
          {/* Capa de fondo desenfocada (bokeh): se mueve menos que el frente para dar profundidad */}
          <motion.div className="absolute inset-0" style={{ x: bokehX, y: bokehY }}>
            <Image
              src="/ramo-rosas.png"
              alt=""
              aria-hidden
              fill
              className="object-contain blur-md opacity-40 scale-105 saturate-125"
            />
          </motion.div>

          {/* Capa nítida frontal con inclinación 3D según el cursor */}
          <motion.div
            className="absolute inset-0"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <Image
              src="/ramo-rosas.png"
              alt="Ramo de 20 Rosas Rojas para Aracely"
              fill
              className="object-contain drop-shadow-[0_15px_25px_rgba(225,29,72,0.15)] filter contrast-110 saturate-110"
              priority
            />
            {/* Brillo que recorre los pétalos, como luz reflejándose. La máscara va en el
                contenedor fijo para que quede anclada a la silueta del ramo; solo el
                degradado interior se desliza, así no "flota" un recorte fuera de la flor. */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{
                mixBlendMode: "soft-light",
                WebkitMaskImage: "url(/ramo-rosas.png)",
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskImage: "url(/ramo-rosas.png)",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
            >
              <motion.div
                className="absolute inset-y-0"
                style={{
                  left: "-50%",
                  width: "60%",
                  background:
                    "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.45) 50%, transparent 80%)",
                }}
                animate={{ x: ["-20%", "220%"] }}
                transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

    </div>
  );
}