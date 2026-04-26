'use client';

import React from 'react';
import ServiceCard from './ServiceCard';
import { motion } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  description: string;
  video_url: string;
}

interface ServicesProps {
  services: Service[];
}

const Services = ({ services }: ServicesProps) => {
  return (
    <section id="servicios" className="py-24 px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Nuestros <span className="text-accent-cyan">Servicios</span>
        </h2>
        <p className="text-white/40 max-w-2xl mx-auto">
          Transformamos tu operación con soluciones de inteligencia artificial diseñadas para el impacto real.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            videoUrl={service.video_url}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
