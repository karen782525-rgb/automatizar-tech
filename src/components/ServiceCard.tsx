'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, ExternalLink } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  videoUrl: string;
  btnText?: string;
  btnUrl?: string;
}

const ServiceCard = ({ title, description, videoUrl, btnText, btnUrl }: ServiceCardProps) => {
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
      className="group relative overflow-hidden rounded-3xl glass bg-black/40 border border-white/10 flex flex-col h-full"
    >
      {/* Video Container */}
      <div className="relative aspect-video w-full overflow-hidden shrink-0">
        <video
          key={videoUrl}
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
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-4 py-2 glass rounded-full text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/20 transition-all active:scale-95"
        >
          {isMuted ? (
            <>
              <VolumeX size={14} />
              <span>Escucha la IA</span>
            </>
          ) : (
            <>
              <Volume2 size={14} className="text-accent-cyan animate-pulse" />
              <span>En vivo</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent group-hover:to-accent-cyan transition-all">
          {title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow">
          {description}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 mt-auto">
          {btnUrl && (
            <motion.a
              href={btnUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
            >
              {btnText || 'Ver Demo'} <ExternalLink size={14} className="text-accent-cyan" />
            </motion.a>
          )}
          
          <a href="#contacto" className="flex items-center text-accent-cyan text-xs font-black uppercase tracking-widest hover:translate-x-2 transition-transform">
            Me interesa <Play size={14} className="ml-2 fill-accent-cyan" />
          </a>
        </div>
      </div>

      {/* Hover Light Effect */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-accent-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default ServiceCard;
