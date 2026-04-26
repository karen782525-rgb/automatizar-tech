'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Video, FileText, Type, Palette, Layout, Maximize, Smartphone } from 'lucide-react';

export default function ContentPage() {
  const [heroVideo, setHeroVideo] = useState('');
  const [heroEffects, setHeroEffects] = useState('');
  const [heroTitleMain, setHeroTitleMain] = useState('');
  const [heroTitleAccent, setHeroTitleAccent] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  
  // Estilos Logo
  const [logoText, setLogoText] = useState('automatizar.tech');
  const [logoColor, setLogoColor] = useState('#00f2ff');
  const [logoColor2, setLogoColor2] = useState('#9d50bb');
  const [logoGradient, setLogoGradient] = useState(true);
  const [logoEffect, setLogoEffect] = useState('none');
  const [logoSize, setLogoSize] = useState('1.5');

  // Estilos Texto Principal (Procesos)
  const [heroMainColor, setHeroMainColor] = useState('#ffffff');
  const [heroMainColor2, setHeroMainColor2] = useState('#ffffff');
  const [heroMainGradient, setHeroMainGradient] = useState(false);
  const [heroMainEffect, setHeroMainEffect] = useState('none');
  const [heroMainSize, setHeroMainSize] = useState('8');

  // Estilos Texto Destacado (Inteligentes)
  const [heroAccentColor, setHeroAccentColor] = useState('#00f2ff');
  const [heroAccentColor2, setHeroAccentColor2] = useState('#9d50bb');
  const [heroAccentGradient, setHeroAccentGradient] = useState(true);
  const [heroAccentEffect, setHeroAccentEffect] = useState('none');
  const [heroAccentSize, setHeroAccentSize] = useState('8');

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
          
          setLogoText(settings.find(s => s.key === 'logo_text')?.value || 'automatizar.tech');
          setLogoColor(settings.find(s => s.key === 'logo_color')?.value || '#00f2ff');
          setLogoColor2(settings.find(s => s.key === 'logo_color_2')?.value || '#9d50bb');
          setLogoGradient(settings.find(s => s.key === 'logo_gradient')?.value === 'true');
          setLogoEffect(settings.find(s => s.key === 'logo_effect')?.value || 'none');
          setLogoSize(settings.find(s => s.key === 'logo_size')?.value || '1.5');

          setHeroMainColor(settings.find(s => s.key === 'hero_main_color')?.value || '#ffffff');
          setHeroMainColor2(settings.find(s => s.key === 'hero_main_color_2')?.value || '#ffffff');
          setHeroMainGradient(settings.find(s => s.key === 'hero_main_gradient')?.value === 'true');
          setHeroMainEffect(settings.find(s => s.key === 'hero_main_effect')?.value || 'none');
          setHeroMainSize(settings.find(s => s.key === 'hero_main_size')?.value || '8');

          setHeroAccentColor(settings.find(s => s.key === 'hero_accent_color')?.value || '#00f2ff');
          setHeroAccentColor2(settings.find(s => s.key === 'hero_accent_color_2')?.value || '#9d50bb');
          setHeroAccentGradient(settings.find(s => s.key === 'hero_accent_gradient')?.value === 'true');
          setHeroAccentEffect(settings.find(s => s.key === 'hero_accent_effect')?.value || 'none');
          setHeroAccentSize(settings.find(s => s.key === 'hero_accent_size')?.value || '8');
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

  const saveAll = async () => {
    setSaving(true);
    const updates = [
      { key: 'hero_video_url', value: heroVideo },
      { key: 'hero_video_effects', value: heroEffects },
      { key: 'hero_title_main', value: heroTitleMain },
      { key: 'hero_title_accent', value: heroTitleAccent },
      { key: 'hero_subtitle', value: heroSubtitle },
      
      { key: 'logo_text', value: logoText },
      { key: 'logo_color', value: logoColor },
      { key: 'logo_color_2', value: logoColor2 },
      { key: 'logo_gradient', value: String(logoGradient) },
      { key: 'logo_effect', value: logoEffect },
      { key: 'logo_size', value: logoSize },

      { key: 'hero_main_color', value: heroMainColor },
      { key: 'hero_main_color_2', value: heroMainColor2 },
      { key: 'hero_main_gradient', value: String(heroMainGradient) },
      { key: 'hero_main_effect', value: heroMainEffect },
      { key: 'hero_main_size', value: heroMainSize },

      { key: 'hero_accent_color', value: heroAccentColor },
      { key: 'hero_accent_color_2', value: heroAccentColor2 },
      { key: 'hero_accent_gradient', value: String(heroAccentGradient) },
      { key: 'hero_accent_effect', value: heroAccentEffect },
      { key: 'hero_accent_size', value: heroAccentSize },
    ];
    const { error } = await supabase.from('site_settings').upsert(updates);
    setSaving(false);
    if (error) alert('Error: ' + error.message);
    else alert('Todo el contenido actualizado correctamente');
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
    <div className="space-y-12 pb-24 max-w-7xl mx-auto px-4">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">Gestión de Contenido</h1>
          <p className="text-white/40 mt-2 text-sm uppercase tracking-widest">Personalización total de la plataforma</p>
        </div>
        <button onClick={saveAll} disabled={saving} className="px-10 py-4 bg-accent-cyan text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_50px_rgba(0,242,255,0.4)] transition-all uppercase text-xs tracking-widest">
          <Save size={18} /> {saving ? 'Guardando...' : 'Guardar Todo'}
        </button>
      </header>

      {/* Identidad de Marca (Logo) */}
      <section className="glass p-8 rounded-[2.5rem] border-accent-violet/20 bg-accent-violet/5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Smartphone className="text-accent-violet" />
            <h2 className="text-2xl font-bold">Identidad de Marca (Logo)</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/20 uppercase ml-2">Texto del Logo</label>
            <input className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 outline-none font-bold" value={logoText} onChange={(e) => setLogoText(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/20 uppercase ml-2">Tamaño Logo (rem)</label>
            <input type="number" step="0.1" className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 outline-none font-bold text-accent-violet" value={logoSize} onChange={(e) => setLogoSize(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/20 uppercase ml-2">Efecto Especial</label>
            <select value={logoEffect} onChange={(e) => setLogoEffect(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 outline-none appearance-none">
              <option value="none">Ninguno</option>
              <option value="glow">Glow</option>
              <option value="neon">Neon</option>
              <option value="3d">3D</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-8 bg-black/20 p-6 rounded-3xl border border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1 items-center">
              <span className="text-[8px] text-white/40 uppercase">Color 1</span>
              <input type="color" value={logoColor} onChange={(e) => setLogoColor(e.target.value)} className="h-10 w-10 bg-transparent border-none cursor-pointer" />
            </div>
            {logoGradient && (
              <div className="flex flex-col gap-1 items-center">
                <span className="text-[8px] text-white/40 uppercase">Color 2</span>
                <input type="color" value={logoColor2} onChange={(e) => setLogoColor2(e.target.value)} className="h-10 w-10 bg-transparent border-none cursor-pointer" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 border-l border-white/10 pl-8">
            <span className="text-[10px] font-bold text-white/40 uppercase">Degradado</span>
            <button onClick={() => setLogoGradient(!logoGradient)} className={`w-10 h-5 rounded-full relative transition-all ${logoGradient ? 'bg-accent-violet' : 'bg-white/10'}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${logoGradient ? 'left-5.5' : 'left-0.5'}`} />
            </button>
          </div>
          <div className="ml-auto text-sm text-white/20 font-mono flex items-center gap-4">
            Previsualización: 
            <span style={{ 
              fontSize: `${logoSize}rem`, 
              color: logoGradient ? 'transparent' : logoColor,
              backgroundImage: logoGradient ? `linear-gradient(to right, ${logoColor}, ${logoColor2})` : 'none',
              WebkitBackgroundClip: logoGradient ? 'text' : 'none',
              filter: logoEffect === 'glow' ? `drop-shadow(0 0 5px ${logoColor})` : logoEffect === 'neon' ? `drop-shadow(0 0 10px ${logoColor})` : 'none'
            }} className="font-black tracking-tighter">
              {logoText}
            </span>
          </div>
        </div>
      </section>

      {/* Marcas Aliadas */}
      <section className="glass p-8 rounded-[2.5rem] border-white/10 bg-accent-cyan/5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Plus className="text-accent-cyan" />
            <h2 className="text-2xl font-bold">Aliados Estratégicos (Marcas)</h2>
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
        <div className="flex items-center gap-3 mb-8">
          <Type className="text-accent-cyan" />
          <h2 className="text-2xl font-bold">Banner Principal (Hero)</h2>
        </div>
        
        <div className="space-y-12">
          {/* Controles de Contenido Base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/20 uppercase ml-2 tracking-widest">Video URL (Cloudinary)</label>
              <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none" value={heroVideo} onChange={(e) => setHeroVideo(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/20 uppercase ml-2 tracking-widest">Efectos Video</label>
              <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none" placeholder="ej: e_grayscale" value={heroEffects} onChange={(e) => setHeroEffects(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-white/20 uppercase ml-2 tracking-widest">Subtítulo</label>
            <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 h-24 outline-none resize-none" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} />
          </div>

          {/* ESTILO TEXTO 1 (PROCESOS) */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <Layout size={18} className="text-white/40" />
                <h3 className="font-bold text-white/80">Texto Principal (Ej: "Procesos")</h3>
              </div>
              <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl">
                <Maximize size={14} className="text-white/20" />
                <span className="text-[10px] text-white/40 font-bold uppercase">Tamaño:</span>
                <input type="number" step="0.5" className="bg-transparent border-none w-12 text-sm font-bold text-accent-cyan p-0 focus:ring-0" value={heroMainSize} onChange={(e) => setHeroMainSize(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 outline-none" value={heroTitleMain} onChange={(e) => setHeroTitleMain(e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase ml-2 text-center block">Color Base</label>
                  <input type="color" className="w-full h-12 bg-transparent cursor-pointer" value={heroMainColor} onChange={(e) => setHeroMainColor(e.target.value)} />
                </div>
                {heroMainGradient && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase ml-2 text-center block">Color 2</label>
                    <input type="color" className="w-full h-12 bg-transparent cursor-pointer" value={heroMainColor2} onChange={(e) => setHeroMainColor2(e.target.value)} />
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between bg-black/20 p-4 rounded-2xl border border-white/5">
                <span className="text-xs font-bold text-white/40 uppercase">Usar Degradado</span>
                <button onClick={() => setHeroMainGradient(!heroMainGradient)} className={`w-12 h-6 rounded-full relative transition-all ${heroMainGradient ? 'bg-accent-cyan' : 'bg-white/10'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${heroMainGradient ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              <select value={heroMainEffect} onChange={(e) => setHeroMainEffect(e.target.value)} className="bg-black/20 border border-white/10 rounded-2xl px-6 outline-none text-sm appearance-none">
                <option value="none">Ninguno</option>
                <option value="glow">Glow</option>
                <option value="neon">Neon</option>
                <option value="3d">3D</option>
              </select>
            </div>
          </div>

          {/* ESTILO TEXTO 2 (INTELIGENTES) */}
          <div className="p-8 rounded-3xl bg-accent-cyan/5 border border-accent-cyan/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <Palette size={18} className="text-accent-cyan" />
                <h3 className="font-bold text-accent-cyan/80">Texto Destacado (Ej: "Inteligentes")</h3>
              </div>
              <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-accent-cyan/20">
                <Maximize size={14} className="text-accent-cyan/40" />
                <span className="text-[10px] text-accent-cyan/40 font-bold uppercase">Tamaño:</span>
                <input type="number" step="0.5" className="bg-transparent border-none w-12 text-sm font-bold text-accent-cyan p-0 focus:ring-0" value={heroAccentSize} onChange={(e) => setHeroAccentSize(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 outline-none" value={heroTitleAccent} onChange={(e) => setHeroTitleAccent(e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase ml-2 text-center block">Color Base</label>
                  <input type="color" className="w-full h-12 bg-transparent cursor-pointer" value={heroAccentColor} onChange={(e) => setHeroAccentColor(e.target.value)} />
                </div>
                {heroAccentGradient && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase ml-2 text-center block">Color 2</label>
                    <input type="color" className="w-full h-12 bg-transparent cursor-pointer" value={heroAccentColor2} onChange={(e) => setHeroAccentColor2(e.target.value)} />
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between bg-black/20 p-4 rounded-2xl border border-white/5">
                <span className="text-xs font-bold text-white/40 uppercase">Usar Degradado</span>
                <button onClick={() => setHeroAccentGradient(!heroAccentGradient)} className={`w-12 h-6 rounded-full relative transition-all ${heroAccentGradient ? 'bg-accent-cyan' : 'bg-white/10'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${heroAccentGradient ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              <select value={heroAccentEffect} onChange={(e) => setHeroAccentEffect(e.target.value)} className="bg-black/20 border border-white/10 rounded-2xl px-6 outline-none text-sm appearance-none">
                <option value="none">Ninguno</option>
                <option value="glow">Glow</option>
                <option value="neon">Neon</option>
                <option value="3d">3D</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Services Management */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Catálogo de Servicios</h2>
          <button onClick={addService} className="px-6 py-3 glass rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/10 text-xs tracking-widest uppercase">+ Añadir Nuevo</button>
        </div>
        <div className="grid gap-6">
          {services.map((service) => (
            <div key={service.id} className="glass p-8 rounded-[2.5rem] border-white/5 space-y-4">
              <div className="flex justify-between gap-4">
                <input className="bg-transparent text-2xl font-bold w-full border-none p-0 focus:ring-0 outline-none" value={service.title} onBlur={(e) => updateService(service.id, 'title', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, title: e.target.value } : s))} />
                <button onClick={() => deleteService(service.id)} className="text-red-400/20 hover:text-red-400 transition-colors"><Trash2 /></button>
              </div>
              <textarea className="bg-transparent text-white/50 w-full border-none p-0 h-20 resize-none focus:ring-0 outline-none" value={service.description} onBlur={(e) => updateService(service.id, 'description', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, description: e.target.value } : s))} />
              <div className="flex items-center gap-4 pt-4 border-t border-white/5 text-xs text-white/20">
                <Video size={14} />
                <input className="w-full bg-transparent border-none p-0 focus:ring-0 outline-none" placeholder="URL Video Preview" value={service.video_url} onBlur={(e) => updateService(service.id, 'video_url', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, video_url: e.target.value } : s))} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
