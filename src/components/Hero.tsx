'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  logo_url: string;
}

interface HeroProps {
  videoUrl?: string;
  effects?: string;
  titleMain?: string;
  titleAccent?: string;
  subtitle?: string;
  mainColor?: string;
  mainColor2?: string;
  mainGradient?: boolean;
  mainEffect?: string;
  mainSize?: string;
  accentColor?: string;
  accentColor2?: string;
  accentGradient?: boolean;
  accentEffect?: string;
  accentSize?: string;
  btnPrimaryBg?: string;
  btnPrimaryText?: string;
  btnSecondaryBorder?: string;
  btnSecondaryText?: string;
  marqueeLabel?: string;
  marqueeLabelColor?: string;
  marqueeLabelSize?: string;
  brands?: Brand[];
  videoOpacity?: string;
}

const Hero = ({ 
  videoUrl = "https://res.cloudinary.com/demo/video/upload/v1631234567/sample.mp4",
  effects = "",
  videoOpacity = "40",
  titleMain = "Potenciamos tu Equipo con",
  titleAccent = "Inteligencia Artificial",
  subtitle = "Soluciones de vanguardia para automatizar, escalar y transformar el futuro de tu negocio.",
  mainColor = "#ffffff",
  mainColor2 = "#ffffff",
  mainGradient = false,
  mainEffect = "none",
  mainSize = "8",
  accentColor = "#00f2ff",
  accentColor2 = "#9d50bb",
  accentGradient = true,
  accentEffect = "none",
  accentSize = "8",
  btnPrimaryBg = "#00f2ff",
  btnPrimaryText = "#000000",
  btnSecondaryBorder = "#ffffff",
  btnSecondaryText = "#ffffff",
  marqueeLabel = "Marcas que confían en nosotros",
  marqueeLabelColor = "rgba(255,255,255,0.4)",
  marqueeLabelSize = "0.75",
  brands = []
}: HeroProps) => {
  const [isMuted, setIsMuted] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const toggleAudio = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      // Aseguramos que el video siga reproduciéndose
      videoRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
  };

  const getTextStyle = (isGrad: boolean, col1: string, col2: string, effect: string, size: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontSize: `clamp(2.5rem, 8vw, ${size}rem)`,
      lineHeight: '1.1'
    };
    if (isGrad) {
      base.backgroundImage = `linear-gradient(to right, ${col1}, ${col2})`;
      base.WebkitBackgroundClip = 'text';
      base.color = 'transparent';
    } else {
      base.color = col1;
    }
    if (effect === 'glow') base.filter = `drop-shadow(0 0 10px ${col1})`;
    if (effect === 'neon') base.filter = `drop-shadow(0 0 2px #fff) drop-shadow(0 0 10px ${col1})`;
    if (effect === '3d') base.textShadow = `3px 3px 0px rgba(0,0,0,0.3)`;
    return base;
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          key={videoUrl} 
          autoPlay 
          loop 
          muted={isMuted} 
          playsInline 
          style={{ filter: effects, opacity: Number(videoOpacity) / 100 }}
          className="h-full w-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-7xl pt-10 pb-32">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
          <h1 className="font-extrabold tracking-tighter mb-6 leading-tight flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8">
            <span style={getTextStyle(mainGradient, mainColor, mainColor2, mainEffect, mainSize)}>{titleMain}</span>
            <span style={getTextStyle(accentGradient, accentColor, accentColor2, accentEffect, accentSize)}>{titleAccent}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light">{subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contacto" style={{ backgroundColor: btnPrimaryBg, color: btnPrimaryText }} className="px-8 py-4 font-bold rounded-2xl transition-all hover:scale-105">Comenzar Ahora</a>
            <a href="#servicios" style={{ border: `1px solid ${btnSecondaryBorder}`, color: btnSecondaryText }} className="px-8 py-4 glass font-bold rounded-2xl hover:bg-white/5 transition-all">Ver Servicios</a>
          </div>
        </motion.div>
      </div>

      {/* Audio Toggle Button - REPOSITIONED AND OPTIMIZED */}
      <button 
        onClick={toggleAudio} 
        className="absolute z-50 top-24 right-6 md:top-auto md:bottom-48 md:right-10 flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 glass rounded-full border border-white/10 text-white hover:bg-white/10 transition-all shadow-2xl active:scale-95"
      >
        {isMuted ? <VolumeX size={16} className="md:w-5 md:h-5 text-white/40" /> : <Volume2 size={16} className="md:w-5 md:h-5 text-accent-cyan animate-pulse" />}
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{isMuted ? "Activar Sonido" : "Silenciar"}</span>
      </button>

      {brands.length > 0 && (
        <div className="absolute bottom-8 w-full z-20">
          <p style={{ color: marqueeLabelColor, fontSize: `${marqueeLabelSize}rem` }} className="text-center uppercase tracking-[0.4em] mb-6 font-bold">{marqueeLabel}</p>
          <div className="relative overflow-hidden">
            <motion.div className="flex gap-16 md:gap-32 items-center w-max mx-auto" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
              {[...brands, ...brands].map((brand, idx) => (
                <div key={`${brand.id}-${idx}`} className="flex items-center justify-center opacity-60">
                  <img src={brand.logo_url} alt={brand.name} className="h-8 md:h-12 w-auto object-contain brightness-110" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
