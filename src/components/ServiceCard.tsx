'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  videoUrl: string;
}

const ServiceCard = ({ title, description, videoUrl }: ServiceCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-3xl glass bg-black/40 border border-white/10"
    >
      {/* Video Container */}
      <div className="relative aspect-video w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        
        {/* Audio Toggle Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold text-white hover:bg-white/20 transition-all active:scale-95"
        >
          {isMuted ? (
            <>
              <VolumeX size={16} />
              <span>Escucha la IA en acción</span>
            </>
          ) : (
            <>
              <Volume2 size={16} className="text-accent-cyan animate-pulse" />
              <span>Audio Activado</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent group-hover:to-accent-cyan transition-all">
          {title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-6">
          {description}
        </p>
        
        <div className="flex items-center text-accent-cyan text-sm font-bold group-hover:translate-x-2 transition-transform">
          Saber más <Play size={14} className="ml-2 fill-accent-cyan" />
        </div>
      </div>

      {/* Hover Light Effect */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-accent-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default ServiceCard;
