'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavbarProps {
  logoText?: string;
  logoColor?: string;
  logoColor2?: string;
  logoGradient?: boolean;
  logoSize?: string;
  logoEffect?: string;
}

const Navbar = ({
  logoText = 'automatizar.tech',
  logoColor = '#00f2ff',
  logoColor2 = '#9d50bb',
  logoGradient = true,
  logoSize = '1.5',
  logoEffect = 'none'
}: NavbarProps) => {
  
  const getLogoStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontSize: `${logoSize}rem`,
      fontWeight: '900',
      letterSpacing: '-0.05em'
    };
    
    if (logoGradient) {
      base.backgroundImage = `linear-gradient(to right, ${logoColor}, ${logoColor2})`;
      base.WebkitBackgroundClip = 'text';
      base.color = 'transparent';
    } else {
      base.color = logoColor;
    }

    switch (logoEffect) {
      case 'glow':
        base.filter = `drop-shadow(0 0 8px ${logoColor})`;
        break;
      case 'neon':
        base.filter = `drop-shadow(0 0 2px #fff) drop-shadow(0 0 10px ${logoColor})`;
        break;
      case '3d':
        base.textShadow = `2px 2px 0px rgba(0,0,0,0.5)`;
        break;
    }

    return base;
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 glass bg-black/20 backdrop-blur-md border-b border-white/5"
    >
      <Link href="/" className="flex items-center gap-2">
        <span style={getLogoStyle()} className="transition-all duration-500 hover:scale-105 active:scale-95">
          {logoText}
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
        <Link href="#servicios" className="hover:text-accent-cyan transition-colors">Servicios</Link>
        <Link href="#contacto" className="hover:text-accent-cyan transition-colors">Contacto</Link>
        <Link 
          href="/admin" 
          className="px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all text-[10px] tracking-widest uppercase font-bold"
        >
          Admin
        </Link>
      </div>

      {/* Mobile Menu Button - simplified for now */}
      <button className="md:hidden text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </motion.nav>
  );
};

export default Navbar;
