'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Building, Clock, Search, Trash2, Filter, Download, User, MessageSquare } from 'lucide-react';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = leads.filter(lead => 
      lead.name?.toLowerCase().includes(term) || 
      lead.email?.toLowerCase().includes(term) || 
      lead.company?.toLowerCase().includes(term) ||
      lead.need?.toLowerCase().includes(term)
    );
    setFilteredLeads(filtered);
  }, [searchTerm, leads]);

  async function fetchLeads() {
    setLoading(true);
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    setLeads(data || []);
    setFilteredLeads(data || []);
    setLoading(false);
  }

  async function deleteLead(id: string) {
    if (!confirm('¿Seguro que quieres eliminar este lead? Esta acción no se puede deshacer.')) return;
    
    setIsDeleting(id);
    const { error } = await supabase.from('leads').delete().eq('id', id);
    
    if (error) {
      alert('Error al eliminar: ' + error.message);
    } else {
      setLeads(leads.filter(l => l.id !== id));
    }
    setIsDeleting(null);
  }

  const exportLeads = () => {
    const headers = ['Fecha', 'Nombre', 'Email', 'Empresa', 'Necesidad'];
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(l => [
        new Date(l.created_at).toLocaleDateString(),
        `"${l.name}"`,
        l.email,
        `"${l.company || ''}"`,
        `"${l.need?.replace(/"/g, '""') || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_automatizar_tech_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter italic bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">Lead Manager</h1>
          <p className="text-[10px] text-accent-cyan uppercase tracking-[0.4em] font-bold mt-1">Gestión de Clientes & Proyectos</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-cyan transition-colors" size={16} />
            <input
              type="text"
              placeholder="Buscar por nombre, email o empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-accent-cyan transition-all w-full md:w-80 font-medium"
            />
          </div>
          <button 
            onClick={exportLeads}
            className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white hover:bg-white/10 transition-all"
            title="Exportar CSV"
          >
            <Download size={20} />
          </button>
        </div>
      </header>

      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/20 px-2">
        <Filter size={12} />
        <span>Mostrando {filteredLeads.length} leads</span>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      {loading ? (
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/20 text-xs font-black uppercase tracking-widest">Sincronizando Leads...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="glass p-20 rounded-[3rem] border-white/5 text-center bg-white/[0.02]">
          <p className="text-white/10 font-black text-xl uppercase tracking-widest">No se encontraron resultados</p>
          <button onClick={() => setSearchTerm('')} className="mt-4 text-accent-cyan text-[10px] font-black uppercase hover:underline">Limpiar búsqueda</button>
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence mode='popLayout'>
            {filteredLeads.map((lead, i) => (
              <motion.div
                key={lead.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.03 }}
                className="glass p-5 rounded-[2rem] border-white/5 hover:border-white/10 transition-all group flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <div className="flex items-center gap-4 min-w-[240px]">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-violet/20 to-accent-cyan/20 flex items-center justify-center text-white/40 group-hover:text-accent-cyan transition-colors">
                    <User size={24} />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-black text-lg tracking-tight">{lead.name}</h3>
                    <div className="flex items-center gap-3 text-white/40 text-[10px] font-bold uppercase">
                      <span className="flex items-center gap-1"><Mail size={10} /> {lead.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 w-full space-y-2">
                  {lead.company && (
                    <div className="flex items-center gap-2 text-[10px] font-black text-accent-violet uppercase tracking-widest">
                      <Building size={12} /> {lead.company}
                    </div>
                  )}
                  <div className="bg-black/20 p-4 rounded-2xl border border-white/5 relative group/msg">
                    <MessageSquare size={12} className="absolute -top-1 -left-1 text-accent-cyan opacity-0 group-hover/msg:opacity-100 transition-opacity" />
                    <p className="text-sm text-white/60 leading-relaxed italic line-clamp-3">
                      "{lead.need}"
                    </p>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full">
                    <Clock size={12} />
                    {new Date(lead.created_at).toLocaleDateString()}
                  </div>
                  
                  <button 
                    onClick={() => deleteLead(lead.id)}
                    disabled={isDeleting === lead.id}
                    className="p-3 text-white/10 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
