'use client';

import React from 'react';
import ServiceCard from './ServiceCard';
import { motion } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  description: string;
  video_url: string;
  button_text?: string;
  button_url?: string;
}

interface ServicesProps {
  services: Service[];
  title?: string;
  subtitle?: string;
  titleColor?: string;
  titleColor2?: string;
  titleGradient?: boolean;
  titleSize?: string;
  titleEffect?: string;
}

const Services = ({ 
  services,
  title = "Nuestros Servicios",
  subtitle = "Transformamos tu operación con soluciones de inteligencia artificial diseñadas para el impacto real.",
  titleColor = "#ffffff",
  titleColor2 = "#00f2ff",
  titleGradient = true,
  titleSize = "4",
  titleEffect = "none"
}: ServicesProps) => {

  const getTitleStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontSize: `${titleSize}rem`,
      lineHeight: '1.1'
    };
    
    if (titleGradient) {
      base.backgroundImage = `linear-gradient(to right, ${titleColor}, ${titleColor2})`;
      base.WebkitBackgroundClip = 'text';
      base.color = 'transparent';
    } else {
      base.color = titleColor;
    }

    switch (titleEffect) {
      case 'glow':
        base.filter = `drop-shadow(0 0 10px ${titleColor})`;
        break;
      case 'neon':
        base.filter = `drop-shadow(0 0 2px #fff) drop-shadow(0 0 10px ${titleColor})`;
        break;
      case '3d':
        base.textShadow = `3px 3px 0px rgba(0,0,0,0.3)`;
        break;
    }

    return base;
  };

  return (
    <section id="servicios" className="py-24 px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 style={getTitleStyle()} className="font-black tracking-tighter mb-6 inline-block text-4xl md:text-[length:inherit]">
          {title}
        </h2>
        <p className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
16: 
17:       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
18:         {services.map((service) => (
19:           <ServiceCard
20:             key={service.id}
21:             title={service.title}
22:             description={service.description}
23:             videoUrl={service.video_url}
24:             btnText={service.button_text}
25:             btnUrl={service.button_url}
26:           />
27:         ))}
28:       </div>
29:     </section>
30:   );
31: };
32: 
33: export default Services;
