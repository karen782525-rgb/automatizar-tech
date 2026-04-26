'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Video, FileText } from 'lucide-react';

export default function ContentPage() {
  const [heroVideo, setHeroVideo] = useState('');
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: settings } = await supabase.from('site_settings').select('*');
      const hero = settings?.find(s => s.key === 'hero_video_url')?.value || '';
      setHeroVideo(hero);

      const { data: svcs } = await supabase.from('services').select('*').order('display_order');
      setServices(svcs || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const saveHero = async () => {
    setSaving(true);
    const { error } = await supabase.from('site_settings').upsert({ key: 'hero_video_url', value: heroVideo });
    setSaving(false);
    if (error) {
      console.error('Error saving hero:', error);
      alert('Error: ' + error.message);
    } else {
      alert('Hero actualizado correctamente');
    }
  };

  const updateService = async (id: string, field: string, value: any) => {
    const updated = services.map(s => s.id === id ? { ...s, [field]: value } : s);
    setServices(updated);
    await supabase.from('services').update({ [field]: value }).eq('id', id);
  };

  const deleteService = async (id: string) => {
    if (!confirm('¿Seguro?')) return;
    await supabase.from('services').delete().eq('id', id);
    setServices(services.filter(s => s.id !== id));
  };

  const addService = async () => {
    const newService = {
      title: 'Nuevo Servicio',
      description: 'Descripción...',
      video_url: '',
      display_order: services.length + 1
    };
    const { data } = await supabase.from('services').insert([newService]).select();
    if (data) setServices([...services, data[0]]);
  };

  if (loading) return null;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter">Gestión de Contenido</h1>
        <p className="text-white/40 mt-2">Personaliza los videos y textos de tu plataforma</p>
      </header>

      {/* Hero Section Management */}
      <section className="glass p-8 rounded-[2.5rem] border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Video className="text-accent-cyan" />
          <h2 className="text-xl font-bold">Video Principal (Hero)</h2>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="URL del video (Cloudinary mp4)"
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-cyan"
            value={heroVideo}
            onChange={(e) => setHeroVideo(e.target.value)}
          />
          <button
            onClick={saveHero}
            disabled={saving}
            className="px-8 py-4 bg-accent-cyan text-black font-bold rounded-2xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <Save size={18} />
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </section>

      {/* Services Management */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-accent-violet" />
            <h2 className="text-xl font-bold">Servicios</h2>
          </div>
          <button
            onClick={addService}
            className="px-6 py-3 glass hover:bg-white/10 text-white font-bold rounded-2xl flex items-center gap-2 transition-all"
          >
            <Plus size={18} />
            Añadir Servicio
          </button>
        </div>

        <div className="grid gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              layout
              className="glass p-8 rounded-[2rem] border-white/5 space-y-6"
            >
              <div className="flex gap-6">
                <div className="flex-1 space-y-4">
                  <input
                    type="text"
                    className="w-full bg-transparent text-2xl font-bold border-none focus:ring-0 p-0 placeholder:text-white/10"
                    placeholder="Título del servicio"
                    value={service.title}
                    onBlur={(e) => updateService(service.id, 'title', e.target.value)}
                    onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, title: e.target.value } : s))}
                  />
                  <textarea
                    className="w-full bg-transparent text-white/50 border-none focus:ring-0 p-0 resize-none h-20"
                    placeholder="Descripción..."
                    value={service.description}
                    onBlur={(e) => updateService(service.id, 'description', e.target.value)}
                    onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, description: e.target.value } : s))}
                  />
                </div>
                <button
                  onClick={() => deleteService(service.id)}
                  className="text-red-400/20 hover:text-red-400 p-2 h-fit"
                >
                  <Trash2 size={24} />
                </button>
              </div>
              
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <Video size={18} className="text-white/20" />
                <input
                  type="text"
                  placeholder="URL del video preview"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-accent-cyan"
                  value={service.video_url}
                  onBlur={(e) => updateService(service.id, 'video_url', e.target.value)}
                  onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, video_url: e.target.value } : s))}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
