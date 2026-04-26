'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Mail, Building, Clock, Search } from 'lucide-react';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      setLeads(data || []);
      setLoading(false);
    }
    fetchLeads();
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">Leads</h1>
          <p className="text-white/40 mt-2">Gestiona los contactos recibidos a través de la web</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input
            type="text"
            placeholder="Buscar lead..."
            className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 focus:outline-none focus:border-accent-cyan transition-colors"
          />
        </div>
      </header>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-8 h-8 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
        </div>
      ) : leads.length === 0 ? (
        <div className="glass p-20 rounded-[2.5rem] border-white/10 text-center">
          <p className="text-white/20 font-bold text-xl uppercase tracking-widest">No hay leads todavía</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {leads.map((lead, i) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass p-6 rounded-3xl border-white/5 hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-1">
                <h3 className="font-bold text-xl">{lead.name}</h3>
                <div className="flex items-center gap-4 text-white/40 text-sm">
                  <span className="flex items-center gap-1.5"><Mail size={14} /> {lead.email}</span>
                  {lead.company && <span className="flex items-center gap-1.5"><Building size={14} /> {lead.company}</span>}
                </div>
              </div>
              
              <div className="flex-1 px-4 py-2 bg-white/5 rounded-2xl text-sm text-white/60">
                <p className="line-clamp-2 italic">"{lead.need}"</p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-white/20 uppercase tracking-widest">
                <Clock size={14} />
                {new Date(lead.created_at).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
