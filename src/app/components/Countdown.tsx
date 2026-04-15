"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: Date;
  onComplete: () => void;
}

export default function Countdown({ targetDate, onComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        onComplete();
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  if (!isMounted) return null;

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center min-w-[60px] md:min-w-[80px]">
      <span className="text-4xl md:text-6xl text-white/90 font-light tracking-widest drop-shadow-lg tabular-nums">
        {formatNumber(value)}
      </span>
      <span className="text-[9px] md:text-xs text-rose-200/40 uppercase tracking-[0.3em] mt-3 font-sans">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-start justify-center gap-2 md:gap-4">
      <TimeBlock value={timeLeft.days} label="Días" />
      <span className="text-3xl md:text-5xl text-white/20 mt-1 md:mt-2 font-light">:</span>
      <TimeBlock value={timeLeft.hours} label="Horas" />
      <span className="text-3xl md:text-5xl text-white/20 mt-1 md:mt-2 font-light">:</span>
      <TimeBlock value={timeLeft.minutes} label="Minutos" />
      <span className="text-3xl md:text-5xl text-white/20 mt-1 md:mt-2 font-light">:</span>
      <TimeBlock value={timeLeft.seconds} label="Segundos" />
    </div>
  );
}