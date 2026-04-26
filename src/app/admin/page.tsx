'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Users, Video, FileText, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    leads: 0,
    services: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const { count: leadsCount } = await supabase.from('leads').select('*', { count: 'exact', head: true });
      const { count: servicesCount } = await supabase.from('services').select('*', { count: 'exact', head: true });
      
      setStats({
        leads: leadsCount || 0,
        services: servicesCount || 0,
      });
    }
    fetchStats();
  }, []);

  const cards = [
    { name: 'Leads Recibidos', value: stats.leads, icon: Users, color: 'text-accent-cyan' },
    { name: 'Servicios Activos', value: stats.services, icon: Video, color: 'text-accent-violet' },
    { name: 'Tasa de Conversión', value: '12.5%', icon: TrendingUp, color: 'text-green-400' },
    { name: 'Contenido CMS', value: 'Gestión', icon: FileText, color: 'text-blue-400' },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter">Bienvenido al Panel</h1>
        <p className="text-white/40 mt-2">Aquí tienes un resumen del estado de automatizar.tech</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-[2rem] border-white/10"
          >
            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 ${card.color}`}>
              <card.icon size={24} />
            </div>
            <p className="text-white/40 text-sm font-medium">{card.name}</p>
            <p className="text-3xl font-bold mt-1">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass p-8 rounded-[2.5rem] border-white/10">
        <h2 className="text-xl font-bold mb-6">Actividad Reciente</h2>
        <div className="flex flex-col items-center justify-center py-12 text-white/20">
          <TrendingUp size={48} className="mb-4 opacity-10" />
          <p>Próximamente: Gráficas de analítica avanzadas</p>
        </div>
      </div>
    </div>
  );
}
