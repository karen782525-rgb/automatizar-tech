'use client';

import React from 'react';
import { motion } from 'framer-motion';

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
  accentColor?: string;
  titleSize?: string;
  brands?: Brand[];
}

const Hero = ({ 
  videoUrl = "https://res.cloudinary.com/demo/video/upload/v1631234567/sample.mp4",
  effects = "",
  titleMain = "Potenciamos tu Equipo con",
  titleAccent = "Inteligencia Artificial",
  subtitle = "Soluciones de vanguardia para automatizar, escalar y transformar el futuro de tu negocio.",
  accentColor = "#00f2ff",
  titleSize = "8",
  brands = []
}: HeroProps) => {
  // Function to inject Cloudinary effects into the URL
  const getTransformedUrl = (url: string, fx: string) => {
    if (!fx || !url.includes('cloudinary.com')) return url;
    if (url.includes('/video/upload/')) {
      return url.replace('/video/upload/', `/video/upload/${fx}/`);
    }
    return url;
  };

  const finalVideoUrl = getTransformedUrl(videoUrl, effects);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          key={finalVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-40"
        >
          <source src={finalVideoUrl} type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Brands Section */}
          {brands.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-8 mb-12 opacity-50 hover:opacity-100 transition-opacity">
              {brands.map((brand) => (
                <img 
                  key={brand.id}
                  src={brand.logo_url} 
                  alt={brand.name} 
                  className="h-6 md:h-8 object-contain filter grayscale invert brightness-200"
                />
              ))}
            </div>
          )}

          <h1 
            style={{ fontSize: `${titleSize}rem` }}
            className="text-5xl md:text-[length:var(--title-size)] font-extrabold tracking-tighter mb-6 leading-tight"
          >
            {titleMain}{' '}
            <span 
              style={{ 
                backgroundImage: `linear-gradient(to right, ${accentColor}, #9d50bb)`,
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              {titleAccent}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accent-cyan text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all duration-300"
            >
              Comenzar Ahora
            </motion.a>
            <motion.a
              href="#servicios"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Ver Servicios
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
