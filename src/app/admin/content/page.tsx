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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: settings } = await supabase.from('site_settings').select('*');
      setHeroVideo(settings?.find(s => s.key === 'hero_video_url')?.value || '');
      setHeroEffects(settings?.find(s => s.key === 'hero_video_effects')?.value || '');
      setHeroTitleMain(settings?.find(s => s.key === 'hero_title_main')?.value || 'Potenciamos tu Equipo con');
      setHeroTitleAccent(settings?.find(s => s.key === 'hero_title_accent')?.value || 'Inteligencia Artificial');
      setHeroSubtitle(settings?.find(s => s.key === 'hero_subtitle')?.value || 'Soluciones de vanguardia para automatizar, escalar y transformar el futuro de tu negocio.');
      setHeroAccentColor(settings?.find(s => s.key === 'hero_accent_color')?.value || '#00f2ff');
      setHeroTitleSize(settings?.find(s => s.key === 'hero_title_size')?.value || '8');

      const { data: svcs } = await supabase.from('services').select('*').order('display_order');
      setServices(svcs || []);

      const { data: bnds } = await supabase.from('brands').select('*').order('display_order');
      setBrands(bnds || []);

      setLoading(false);
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
    
    if (error) {
      alert('Error guardando: ' + error.message);
    } else {
      alert('Configuración del Hero guardada');
    }
  };

  const updateBrand = async (id: string, field: string, value: any) => {
    const { error } = await supabase.from('brands').update({ [field]: value }).eq('id', id);
    if (error) {
      alert('Error: ' + error.message);
    } else {
      setBrands(brands.map(b => b.id === id ? { ...b, [field]: value } : b));
    }
  };

  const addBrand = async () => {
    const newBrand = { name: 'Nueva Marca', logo_url: '', display_order: brands.length + 1 };
    const { data, error } = await supabase.from('brands').insert([newBrand]).select();
    if (error) alert(error.message);
    else if (data) setBrands([...brands, data[0]]);
  };

  const deleteBrand = async (id: string) => {
    if (!confirm('¿Eliminar marca?')) return;
    const { error } = await supabase.from('brands').delete().eq('id', id);
    if (error) alert(error.message);
    else setBrands(brands.filter(b => b.id !== id));
  };

  const updateService = async (id: string, field: string, value: any) => {
    const { error } = await supabase.from('services').update({ [field]: value }).eq('id', id);
    if (error) {
      alert('Error actualizando servicio: ' + error.message);
    } else {
      const updated = services.map(s => s.id === id ? { ...s, [field]: value } : s);
      setServices(updated);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('¿Seguro que quieres eliminar este servicio?')) return;
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      alert('Error eliminando: ' + error.message);
    } else {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const addService = async () => {
    const newService = {
      title: 'Nuevo Servicio',
      description: 'Descripción...',
      video_url: '',
      display_order: services.length + 1
    };
    const { data, error } = await supabase.from('services').insert([newService]).select();
    if (error) {
      alert('Error añadiendo: ' + error.message);
    } else if (data) {
      setServices([...services, data[0]]);
    }
  };

  if (loading) return null;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter">Gestión de Contenido</h1>
        <p className="text-white/40 mt-2">Personaliza los videos y textos de tu plataforma</p>
      </header>

      {/* Brands Management */}
      <section className="glass p-8 rounded-[2.5rem] border-white/10 bg-accent-cyan/5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Plus className="text-accent-cyan" />
            <h2 className="text-2xl font-bold">Marcas Aliadas (Logos)</h2>
          </div>
          <button
            onClick={addBrand}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl flex items-center gap-2 transition-all border border-white/10"
          >
            <Plus size={18} />
            Añadir Nueva Marca
          </button>
        </div>

        {brands.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-[2rem]">
            <p className="text-white/20">Aún no has añadido ninguna marca.</p>
            <button onClick={addBrand} className="text-accent-cyan text-sm font-bold mt-2 hover:underline">
              Haz clic aquí para empezar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div key={brand.id} className="bg-black/40 p-6 rounded-3xl border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    className="bg-transparent font-bold border-none focus:ring-0 p-0 text-white/80 w-full"
                    placeholder="Nombre de la empresa"
                    value={brand.name}
                    onBlur={(e) => updateBrand(brand.id, 'name', e.target.value)}
                    onChange={(e) => setBrands(brands.map(b => b.id === brand.id ? { ...b, name: e.target.value } : b))}
                  />
                  <button onClick={() => deleteBrand(brand.id)} className="text-red-400/40 hover:text-red-400 p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Pegar URL del logo (ej: cloudinary o imgur)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-accent-cyan transition-all"
                  value={brand.logo_url}
                  onBlur={(e) => updateBrand(brand.id, 'logo_url', e.target.value)}
                  onChange={(e) => setBrands(brands.map(b => b.id === brand.id ? { ...b, logo_url: e.target.value } : b))}
                />
                <div className="h-16 flex items-center justify-center bg-white/5 rounded-2xl p-3 border border-white/5">
                  {brand.logo_url ? (
                    <img src={brand.logo_url} alt={brand.name} className="h-full object-contain filter grayscale invert brightness-200" />
                  ) : (
                    <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Vista Previa</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Hero Section Management */}
      <section className="glass p-8 rounded-[2.5rem] border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Video className="text-accent-cyan" />
          <h2 className="text-xl font-bold">Video Principal (Hero)</h2>
        </div>
        <div className="space-y-6">
          {/* Video Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/30 uppercase ml-1">URL del Video</label>
              <input
                type="text"
                placeholder="URL de Cloudinary"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-cyan"
                value={heroVideo}
                onChange={(e) => setHeroVideo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/30 uppercase ml-1">Efectos Cloudinary</label>
              <input
                type="text"
                placeholder="ej: e_grayscale, e_blur:1000"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-violet"
                value={heroEffects}
                onChange={(e) => setHeroEffects(e.target.value)}
              />
            </div>
          </div>

          {/* Text Controls */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase ml-1">Texto Principal</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-cyan"
                  value={heroTitleMain}
                  onChange={(e) => setHeroTitleMain(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase ml-1">Texto Destacado (Color)</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-cyan"
                  value={heroTitleAccent}
                  onChange={(e) => setHeroTitleAccent(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/30 uppercase ml-1">Subtítulo</label>
              <textarea
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-cyan resize-none"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase ml-1">Color Acento</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    className="h-14 w-14 bg-transparent border-none cursor-pointer"
                    value={heroAccentColor}
                    onChange={(e) => setHeroAccentColor(e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus:outline-none text-xs"
                    value={heroAccentColor}
                    onChange={(e) => setHeroAccentColor(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/30 uppercase ml-1">Tamaño Título (rem)</label>
                <input
                  type="number"
                  step="0.5"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none"
                  value={heroTitleSize}
                  onChange={(e) => setHeroTitleSize(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            onClick={saveHero}
            disabled={saving}
            className="w-full py-5 bg-accent-cyan text-black font-bold rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {saving ? 'Guardando cambios...' : 'Guardar Configuración del Banner'}
          </button>
        </div>
      </section>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Plus className="text-accent-cyan" />
            <h2 className="text-xl font-bold">Marcas Aliadas (Logos)</h2>
          </div>
          <button
            onClick={addBrand}
            className="px-6 py-3 glass hover:bg-white/10 text-white font-bold rounded-2xl flex items-center gap-2 transition-all"
          >
            <Plus size={18} />
            Añadir Marca
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="glass p-6 rounded-3xl border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  className="bg-transparent font-bold border-none focus:ring-0 p-0 text-white/80"
                  value={brand.name}
                  onBlur={(e) => updateBrand(brand.id, 'name', e.target.value)}
                  onChange={(e) => setBrands(brands.map(b => b.id === brand.id ? { ...b, name: e.target.value } : b))}
                />
                <button onClick={() => deleteBrand(brand.id)} className="text-red-400/40 hover:text-red-400">
                  <Trash2 size={18} />
                </button>
              </div>
              <input
                type="text"
                placeholder="URL del logo (transparente recomendado)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none"
                value={brand.logo_url}
                onBlur={(e) => updateBrand(brand.id, 'logo_url', e.target.value)}
                onChange={(e) => setBrands(brands.map(b => b.id === brand.id ? { ...b, logo_url: e.target.value } : b))}
              />
              {brand.logo_url && (
                <div className="h-12 flex items-center justify-center bg-white/5 rounded-xl p-2">
                  <img src={brand.logo_url} alt={brand.name} className="h-full object-contain filter grayscale invert brightness-200" />
                </div>
              )}
            </div>
          ))}
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
