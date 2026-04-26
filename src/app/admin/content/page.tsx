'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Video, FileText } from 'lucide-react';

export default function ContentPage() {
  const [heroVideo, setHeroVideo] = useState('');
  const [heroEffects, setHeroEffects] = useState('');
  const [heroTitleMain, setHeroTitleMain] = useState('');
  const [heroTitleAccent, setHeroTitleAccent] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroAccentColor, setHeroAccentColor] = useState('');
  const [heroTitleSize, setHeroTitleSize] = useState('');
  const [brands, setBrands] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: settings } = await supabase.from('site_settings').select('*');
        if (settings) {
          setHeroVideo(settings.find(s => s.key === 'hero_video_url')?.value || '');
          setHeroEffects(settings.find(s => s.key === 'hero_video_effects')?.value || '');
          setHeroTitleMain(settings.find(s => s.key === 'hero_title_main')?.value || 'Potenciamos tu Equipo con');
          setHeroTitleAccent(settings.find(s => s.key === 'hero_title_accent')?.value || 'Inteligencia Artificial');
          setHeroSubtitle(settings.find(s => s.key === 'hero_subtitle')?.value || 'Soluciones de vanguardia...');
          setHeroAccentColor(settings.find(s => s.key === 'hero_accent_color')?.value || '#00f2ff');
          setHeroTitleSize(settings.find(s => s.key === 'hero_title_size')?.value || '8');
        }

        const { data: svcs } = await supabase.from('services').select('*').order('display_order');
        setServices(svcs || []);

        const { data: bnds } = await supabase.from('brands').select('*').order('display_order');
        setBrands(bnds || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const saveHero = async () => {
    setSaving(true);
    const updates = [
      { key: 'hero_video_url', value: heroVideo },
      { key: 'hero_video_effects', value: heroEffects },
      { key: 'hero_title_main', value: heroTitleMain },
      { key: 'hero_title_accent', value: heroTitleAccent },
      { key: 'hero_subtitle', value: heroSubtitle },
      { key: 'hero_accent_color', value: heroAccentColor },
      { key: 'hero_title_size', value: heroTitleSize },
    ];
    const { error } = await supabase.from('site_settings').upsert(updates);
    setSaving(false);
    if (error) alert('Error: ' + error.message);
    else alert('Configuración guardada');
  };

  const addBrand = async () => {
    const newBrand = { name: 'Nueva Marca', logo_url: '', display_order: brands.length + 1 };
    const { data, error } = await supabase.from('brands').insert([newBrand]).select();
    if (error) alert(error.message);
    else if (data) setBrands([...brands, data[0]]);
  };

  const updateBrand = async (id: string, field: string, value: any) => {
    await supabase.from('brands').update({ [field]: value }).eq('id', id);
    setBrands(brands.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const deleteBrand = async (id: string) => {
    if (!confirm('¿Eliminar marca?')) return;
    await supabase.from('brands').delete().eq('id', id);
    setBrands(brands.filter(b => b.id !== id));
  };

  const addService = async () => {
    const newService = { title: 'Nuevo Servicio', description: '...', video_url: '', display_order: services.length + 1 };
    const { data, error } = await supabase.from('services').insert([newService]).select();
    if (error) alert(error.message);
    else if (data) setServices([...services, data[0]]);
  };

  const updateService = async (id: string, field: string, value: any) => {
    await supabase.from('services').update({ [field]: value }).eq('id', id);
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const deleteService = async (id: string) => {
    if (!confirm('¿Eliminar servicio?')) return;
    await supabase.from('services').delete().eq('id', id);
    setServices(services.filter(s => s.id !== id));
  };

  if (loading) return <div className="p-24 text-center">Cargando panel...</div>;

  return (
    <div className="space-y-12 pb-24">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter">Gestión de Contenido</h1>
        <p className="text-white/40 mt-2">Personaliza logos, videos y textos de tu plataforma</p>
      </header>

      {/* Marcas Aliadas */}
      <section className="glass p-8 rounded-[2.5rem] border-white/10 bg-accent-cyan/5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Plus className="text-accent-cyan" />
            <h2 className="text-2xl font-bold">Marcas Aliadas (Logos)</h2>
          </div>
          <button onClick={addBrand} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl flex items-center gap-2 transition-all border border-white/10">
            <Plus size={18} />
            Añadir Nueva Marca
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="bg-black/40 p-6 rounded-3xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center gap-2">
                <input
                  className="bg-transparent font-bold border-none focus:ring-0 p-0 text-white/80 w-full"
                  value={brand.name}
                  onBlur={(e) => updateBrand(brand.id, 'name', e.target.value)}
                  onChange={(e) => setBrands(brands.map(b => b.id === brand.id ? { ...b, name: e.target.value } : b))}
                />
                <button onClick={() => deleteBrand(brand.id)} className="text-red-400/40 hover:text-red-400 p-2"><Trash2 size={18} /></button>
              </div>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-accent-cyan"
                placeholder="URL del Logo"
                value={brand.logo_url}
                onBlur={(e) => updateBrand(brand.id, 'logo_url', e.target.value)}
                onChange={(e) => setBrands(brands.map(b => b.id === brand.id ? { ...b, logo_url: e.target.value } : b))}
              />
              <div className="h-16 flex items-center justify-center bg-white/5 rounded-xl">
                {brand.logo_url && <img src={brand.logo_url} className="h-full object-contain drop-shadow-lg" />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hero Management */}
      <section className="glass p-8 rounded-[2.5rem] border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Video className="text-accent-cyan" />
          <h2 className="text-xl font-bold">Banner Principal (Hero)</h2>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4" placeholder="URL Video" value={heroVideo} onChange={(e) => setHeroVideo(e.target.value)} />
            <input className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4" placeholder="Efectos" value={heroEffects} onChange={(e) => setHeroEffects(e.target.value)} />
            <input className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4" placeholder="Título" value={heroTitleMain} onChange={(e) => setHeroTitleMain(e.target.value)} />
            <input className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4" placeholder="Destacado" value={heroTitleAccent} onChange={(e) => setHeroTitleAccent(e.target.value)} />
          </div>
          <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 h-24" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} />
          <div className="flex gap-4">
             <input type="color" value={heroAccentColor} onChange={(e) => setHeroAccentColor(e.target.value)} className="h-14 w-14 bg-transparent border-none cursor-pointer" />
             <input type="number" value={heroTitleSize} onChange={(e) => setHeroTitleSize(e.target.value)} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4" />
          </div>
          <button onClick={saveHero} disabled={saving} className="w-full py-5 bg-accent-cyan text-black font-bold rounded-2xl flex items-center justify-center gap-2">
            <Save size={18} /> {saving ? 'Guardando...' : 'Guardar Banner'}
          </button>
        </div>
      </section>

      {/* Services Management */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Servicios</h2>
          <button onClick={addService} className="px-6 py-3 glass rounded-2xl font-bold">+ Añadir Servicio</button>
        </div>
        <div className="grid gap-6">
          {services.map((service) => (
            <div key={service.id} className="glass p-8 rounded-[2rem] border-white/5 space-y-4">
              <div className="flex justify-between gap-4">
                <input className="bg-transparent text-2xl font-bold w-full border-none p-0" value={service.title} onBlur={(e) => updateService(service.id, 'title', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, title: e.target.value } : s))} />
                <button onClick={() => deleteService(service.id)} className="text-red-400/20 hover:text-red-400"><Trash2 /></button>
              </div>
              <textarea className="bg-transparent text-white/50 w-full border-none p-0 h-20 resize-none" value={service.description} onBlur={(e) => updateService(service.id, 'description', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, description: e.target.value } : s))} />
              <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2" placeholder="URL Video Preview" value={service.video_url} onBlur={(e) => updateService(service.id, 'video_url', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, video_url: e.target.value } : s))} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
