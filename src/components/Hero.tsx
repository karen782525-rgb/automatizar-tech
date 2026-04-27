'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  
  // Main Text Styles
  mainColor?: string;
  mainColor2?: string;
  mainGradient?: boolean;
  mainEffect?: string;
  mainSize?: string;

  // Accent Text Styles
  accentColor?: string;
  accentColor2?: string;
  accentGradient?: boolean;
  accentEffect?: string;
  accentSize?: string;

  // Button Styles
  btnPrimaryBg?: string;
  btnPrimaryText?: string;
  btnSecondaryBorder?: string;
  btnSecondaryText?: string;

  // Marquee Styles
  marqueeLabel?: string;
  marqueeLabelColor?: string;
  marqueeLabelSize?: string;

  brands?: Brand[];
}

const Hero = ({ 
  videoUrl = "https://res.cloudinary.com/demo/video/upload/v1631234567/sample.mp4",
  effects = "",
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
  const [isMuted, setIsMuted] = useState(true);

  // Function to inject Cloudinary effects into the URL
  const getTransformedUrl = (url: string, fx: string) => {
    if (!fx || !url.includes('cloudinary.com')) return url;
    if (url.includes('/video/upload/')) {
      return url.replace('/video/upload/', `/video/upload/${fx}/`);
    }
    return url;
  };

  const finalVideoUrl = getTransformedUrl(videoUrl, effects);

  const getTextStyle = (isGrad: boolean, col1: string, col2: string, effect: string, size: string): React.CSSProperties => {
    // We use a responsive scaling: the size from admin is the "desktop" size.
    // On mobile we scale it down but on desktop we ensure it looks large.
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

    switch (effect) {
      case 'glow':
        base.filter = `drop-shadow(0 0 10px ${col1})`;
        break;
      case 'neon':
        base.filter = `drop-shadow(0 0 2px #fff) drop-shadow(0 0 10px ${col1})`;
        break;
      case '3d':
        base.textShadow = `3px 3px 0px rgba(0,0,0,0.3), 6px 6px 0px rgba(0,0,0,0.1)`;
        break;
    }

    return base;
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          key={finalVideoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="h-full w-full object-cover opacity-40"
        >
          <source src={finalVideoUrl} type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-7xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="font-extrabold tracking-tighter mb-6 leading-tight flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6">
            <span 
              style={getTextStyle(mainGradient, mainColor, mainColor2, mainEffect, mainSize)} 
              className="inline-block"
            >
              {titleMain}
            </span>
            <span 
              style={getTextStyle(accentGradient, accentColor, accentColor2, accentEffect, accentSize)} 
              className="inline-block"
            >
              {titleAccent}
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: btnPrimaryBg, color: btnPrimaryText }}
              className="px-8 py-4 font-bold rounded-2xl transition-all shadow-lg hover:brightness-110"
            >
              Comenzar Ahora
            </motion.a>
            <motion.a
              href="#servicios"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ border: `1px solid ${btnSecondaryBorder}`, color: btnSecondaryText }}
              className="px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/5 transition-all"
            >
              Ver Servicios
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Audio Toggle Button - REPOSITIONED AND NEUTRAL */}
      <motion.button 
        onClick={() => setIsMuted(!isMuted)}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isMuted ? [1, 1.05, 1] : 1, 
          opacity: 1,
          borderColor: "rgba(255, 255, 255, 0.2)"
        }}
        transition={{ 
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          duration: 0.5
        }}
        className={`absolute z-40 flex items-center gap-2 px-4 py-3 md:px-6 md:py-4 glass rounded-full border transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)] group text-white
          top-24 right-6 md:top-auto md:bottom-40 md:right-8`}
      >
        <div className="relative">
          {isMuted ? <VolumeX size={18} className="md:w-6 md:h-6" /> : <Volume2 size={18} className="md:w-6 md:h-6" />}
          {isMuted && (
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: [1, 1.8, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute inset-0 bg-white/10 rounded-full -z-10"
             />
          )}
        </div>
        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
          {isMuted ? "Activar Sonido" : "Silenciar"}
        </span>
      </motion.button>

      {/* Brand Marquee at the bottom */}
      {brands.length > 0 && (
        <div className="absolute bottom-12 md:bottom-24 w-full z-20">
          <div className="max-w-7xl mx-auto px-4">
            <p 
              style={{ color: marqueeLabelColor, fontSize: `${marqueeLabelSize}rem` }}
              className="text-center uppercase tracking-[0.4em] mb-8 md:mb-10 font-bold"
            >
              {marqueeLabel}
            </p>
            <div className="relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:after:from-black after:to-transparent">
              <motion.div 
                className="flex gap-20 md:gap-40 items-center w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {/* Double the brands for infinite loop effect */}
                {[...brands, ...brands].map((brand, idx) => (
                  <div key={`${brand.id}-${idx}`} className="flex items-center justify-center transition-all duration-500 opacity-60 hover:opacity-100 hover:scale-105">
                    <img 
                      src={brand.logo_url} 
                      alt={brand.name} 
                      className="h-12 md:h-20 lg:h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] brightness-110"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
