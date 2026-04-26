'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Video, FileText, Type, Palette, Layout, Maximize, Smartphone, MousePointer2, Briefcase } from 'lucide-react';

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

  // Estilos Botones
  const [btnPrimaryBg, setBtnPrimaryBg] = useState('#00f2ff');
  const [btnPrimaryText, setBtnPrimaryText] = useState('#000000');
  const [btnSecondaryBorder, setBtnSecondaryBorder] = useState('#ffffff');
  const [btnSecondaryText, setBtnSecondaryText] = useState('#ffffff');

  // Estilos Marquee Label
  const [marqueeLabel, setMarqueeLabel] = useState('Marcas que confían en nosotros');
  const [marqueeLabelColor, setMarqueeLabelColor] = useState('#ffffff66');
  const [marqueeLabelSize, setMarqueeLabelSize] = useState('0.75');

  // Estilos Sección Servicios
  const [servicesTitle, setServicesTitle] = useState('Nuestros Servicios');
  const [servicesSubtitle, setServicesSubtitle] = useState('Transformamos tu operación...');
  const [servicesTitleColor, setServicesTitleColor] = useState('#ffffff');
  const [servicesTitleColor2, setServicesTitleColor2] = useState('#00f2ff');
  const [servicesTitleGradient, setServicesTitleGradient] = useState(true);
  const [servicesTitleSize, setServicesTitleSize] = useState('4');
  const [servicesTitleEffect, setServicesTitleEffect] = useState('none');

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

          setBtnPrimaryBg(settings.find(s => s.key === 'btn_primary_bg')?.value || '#00f2ff');
          setBtnPrimaryText(settings.find(s => s.key === 'btn_primary_text')?.value || '#000000');
          setBtnSecondaryBorder(settings.find(s => s.key === 'btn_secondary_border')?.value || '#ffffff');
          setBtnSecondaryText(settings.find(s => s.key === 'btn_secondary_text')?.value || '#ffffff');

          setMarqueeLabel(settings.find(s => s.key === 'marquee_label')?.value || 'Marcas que confían en nosotros');
          setMarqueeLabelColor(settings.find(s => s.key === 'marquee_label_color')?.value || '#ffffff66');
          setMarqueeLabelSize(settings.find(s => s.key === 'marquee_label_size')?.value || '0.75');

          setServicesTitle(settings.find(s => s.key === 'services_title')?.value || 'Nuestros Servicios');
          setServicesSubtitle(settings.find(s => s.key === 'services_subtitle')?.value || 'Transformamos tu operación...');
          setServicesTitleColor(settings.find(s => s.key === 'services_title_color')?.value || '#ffffff');
          setServicesTitleColor2(settings.find(s => s.key === 'services_title_color_2')?.value || '#00f2ff');
          setServicesTitleGradient(settings.find(s => s.key === 'services_title_gradient')?.value === 'true');
          setServicesTitleSize(settings.find(s => s.key === 'services_title_size')?.value || '4');
          setServicesTitleEffect(settings.find(s => s.key === 'services_title_effect')?.value || 'none');
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

      { key: 'btn_primary_bg', value: btnPrimaryBg },
      { key: 'btn_primary_text', value: btnPrimaryText },
      { key: 'btn_secondary_border', value: btnSecondaryBorder },
      { key: 'btn_secondary_text', value: btnSecondaryText },

      { key: 'marquee_label', value: marqueeLabel },
      { key: 'marquee_label_color', value: marqueeLabelColor },
      { key: 'marquee_label_size', value: marqueeLabelSize },

      { key: 'services_title', value: servicesTitle },
      { key: 'services_subtitle', value: servicesSubtitle },
      { key: 'services_title_color', value: servicesTitleColor },
      { key: 'services_title_color_2', value: servicesTitleColor2 },
      { key: 'services_title_gradient', value: String(servicesTitleGradient) },
      { key: 'services_title_size', value: servicesTitleSize },
      { key: 'services_title_effect', value: servicesTitleEffect },
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

  if (loading) return <div className="p-24 text-center text-white/20 uppercase tracking-widest font-black animate-pulse">Sincronizando con la nube...</div>;

  return (
    <div className="space-y-12 pb-24 max-w-7xl mx-auto px-4">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-12">
        <div>
          <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-r from-white via-white/80 to-white/20 bg-clip-text text-transparent">Content Manager</h1>
          <p className="text-accent-cyan mt-2 text-xs uppercase tracking-[0.4em] font-bold">Arquitectura de marca & Diseño web</p>
        </div>
        <button onClick={saveAll} disabled={saving} className="px-12 py-5 bg-white text-black font-black rounded-[2rem] flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all uppercase text-xs tracking-widest shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
          <Save size={18} /> {saving ? 'Sincronizando...' : 'Publicar Cambios'}
        </button>
      </header>

      {/* Identidad & Logo */}
      <section className="glass p-10 rounded-[3rem] border-white/5 bg-gradient-to-br from-white/5 to-transparent">
        <div className="flex items-center gap-4 mb-10">
          <Smartphone className="text-accent-violet" />
          <h2 className="text-2xl font-black uppercase tracking-tighter">Identidad Visual</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-white/20 uppercase ml-2 tracking-widest">Texto del Logo</label>
            <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none font-bold focus:border-accent-violet transition-colors" value={logoText} onChange={(e) => setLogoText(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/20 uppercase ml-2 tracking-widest">Tamaño Logo</label>
            <input type="number" step="0.1" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none font-bold text-accent-violet" value={logoSize} onChange={(e) => setLogoSize(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/20 uppercase ml-2 tracking-widest">Efecto</label>
            <select value={logoEffect} onChange={(e) => setLogoEffect(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none appearance-none font-bold">
              <option value="none">Limpio</option>
              <option value="glow">Resplandor</option>
              <option value="neon">Neon</option>
              <option value="3d">Volumen 3D</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center gap-8 bg-black/40 p-8 rounded-[2rem] border border-white/5">
          <div className="flex items-center gap-6">
            <input type="color" value={logoColor} onChange={(e) => setLogoColor(e.target.value)} className="h-12 w-12 bg-transparent border-none cursor-pointer" />
            {logoGradient && <input type="color" value={logoColor2} onChange={(e) => setLogoColor2(e.target.value)} className="h-12 w-12 bg-transparent border-none cursor-pointer" />}
            <button onClick={() => setLogoGradient(!logoGradient)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${logoGradient ? 'bg-accent-violet text-white' : 'bg-white/5 text-white/20'}`}>Degradado: {logoGradient ? 'ON' : 'OFF'}</button>
          </div>
          <div className="md:ml-auto flex items-center gap-6">
            <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">Vista Previa:</span>
            <span style={{ 
              fontSize: `${logoSize}rem`, 
              color: logoGradient ? 'transparent' : logoColor,
              backgroundImage: logoGradient ? `linear-gradient(to right, ${logoColor}, ${logoColor2})` : 'none',
              WebkitBackgroundClip: logoGradient ? 'text' : 'none',
              filter: logoEffect === 'glow' ? `drop-shadow(0 0 8px ${logoColor})` : logoEffect === 'neon' ? `drop-shadow(0 0 12px ${logoColor})` : 'none'
            }} className="font-black tracking-tighter">
              {logoText}
            </span>
          </div>
        </div>
      </section>

      {/* Hero Design Suite */}
      <section className="glass p-10 rounded-[3rem] border-white/5">
        <div className="flex items-center gap-4 mb-12">
          <Layout className="text-accent-cyan" />
          <h2 className="text-2xl font-black uppercase tracking-tighter">Diseño del Banner (Hero)</h2>
        </div>
        
        <div className="space-y-16">
          {/* Tipografía dual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-8 border-b border-white/5 pb-4 flex items-center gap-2"><Type size={14}/> Parte Principal</h3>
              <input className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none font-bold text-xl" value={heroTitleMain} onChange={(e) => setHeroTitleMain(e.target.value)} />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl">
                  <input type="color" value={heroMainColor} onChange={(e) => setHeroMainColor(e.target.value)} className="h-8 w-8 bg-transparent border-none cursor-pointer" />
                  {heroMainGradient && <input type="color" value={heroMainColor2} onChange={(e) => setHeroMainColor2(e.target.value)} className="h-8 w-8 bg-transparent border-none cursor-pointer" />}
                  <button onClick={() => setHeroMainGradient(!heroMainGradient)} className={`w-8 h-8 rounded-full border border-white/10 transition-all ${heroMainGradient ? 'bg-white' : 'bg-transparent'}`} />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-white/20 uppercase">Size:</span>
                  <input type="number" step="0.5" className="bg-black/40 border border-white/5 w-16 px-3 py-2 rounded-xl text-center font-bold text-accent-cyan" value={heroMainSize} onChange={(e) => setHeroMainSize(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-accent-cyan/5 border border-accent-cyan/20 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent-cyan/40 mb-8 border-b border-white/5 pb-4 flex items-center gap-2"><Palette size={14}/> Parte Destacada</h3>
              <input className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none font-bold text-xl" value={heroTitleAccent} onChange={(e) => setHeroTitleAccent(e.target.value)} />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl">
                  <input type="color" value={heroAccentColor} onChange={(e) => setHeroAccentColor(e.target.value)} className="h-8 w-8 bg-transparent border-none cursor-pointer" />
                  {heroAccentGradient && <input type="color" value={heroAccentColor2} onChange={(e) => setHeroAccentColor2(e.target.value)} className="h-8 w-8 bg-transparent border-none cursor-pointer" />}
                  <button onClick={() => setHeroAccentGradient(!heroAccentGradient)} className={`w-8 h-8 rounded-full border border-white/10 transition-all ${heroAccentGradient ? 'bg-accent-cyan' : 'bg-transparent'}`} />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-white/20 uppercase">Size:</span>
                  <input type="number" step="0.5" className="bg-black/40 border border-white/5 w-16 px-3 py-2 rounded-xl text-center font-bold text-accent-cyan" value={heroAccentSize} onChange={(e) => setHeroAccentSize(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
            <div className="space-y-6 p-8 rounded-[2rem] bg-white/5 border border-white/5">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/40 flex items-center gap-2"><MousePointer2 size={14}/> Botón Primario</h3>
              <div className="grid grid-cols-2 gap-6">
                <input type="color" value={btnPrimaryBg} onChange={(e) => setBtnPrimaryBg(e.target.value)} className="w-full h-12 bg-transparent cursor-pointer" />
                <input type="color" value={btnPrimaryText} onChange={(e) => setBtnPrimaryText(e.target.value)} className="w-full h-12 bg-transparent cursor-pointer" />
              </div>
            </div>
            <div className="space-y-6 p-8 rounded-[2rem] bg-white/5 border border-white/5">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/40 flex items-center gap-2"><MousePointer2 size={14}/> Botón Secundario</h3>
              <div className="grid grid-cols-2 gap-6">
                <input type="color" value={btnSecondaryBorder} onChange={(e) => setBtnSecondaryBorder(e.target.value)} className="w-full h-12 bg-transparent cursor-pointer" />
                <input type="color" value={btnSecondaryText} onChange={(e) => setBtnSecondaryText(e.target.value)} className="w-full h-12 bg-transparent cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section Header Styles */}
      <section className="glass p-10 rounded-[3rem] border-white/5 bg-gradient-to-br from-accent-cyan/5 to-transparent">
        <div className="flex items-center gap-4 mb-10">
          <Briefcase className="text-accent-cyan" />
          <h2 className="text-2xl font-black uppercase tracking-tighter">Sección de Servicios (Encabezado)</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase ml-2">Título de la Sección</label>
              <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none font-bold" value={servicesTitle} onChange={(e) => setServicesTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase ml-2">Subtítulo</label>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 h-24 outline-none resize-none font-medium text-sm" value={servicesSubtitle} onChange={(e) => setServicesSubtitle(e.target.value)} />
            </div>
          </div>

          <div className="space-y-6 bg-black/20 p-8 rounded-[2rem] border border-white/5">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase ml-2">Color 1</label>
                <input type="color" value={servicesTitleColor} onChange={(e) => setServicesTitleColor(e.target.value)} className="w-full h-10 bg-transparent cursor-pointer" />
              </div>
              {servicesTitleGradient && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase ml-2">Color 2</label>
                  <input type="color" value={servicesTitleColor2} onChange={(e) => setServicesTitleColor2(e.target.value)} className="w-full h-10 bg-transparent cursor-pointer" />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase ml-2 text-center block">Tamaño (rem)</label>
                <input type="number" step="0.5" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none font-bold text-center" value={servicesTitleSize} onChange={(e) => setServicesTitleSize(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase ml-2 text-center block">Efecto</label>
                <select value={servicesTitleEffect} onChange={(e) => setServicesTitleEffect(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none appearance-none text-xs font-bold text-center">
                  <option value="none">Ninguno</option>
                  <option value="glow">Glow</option>
                  <option value="neon">Neon</option>
                  <option value="3d">3D</option>
                </select>
              </div>
            </div>
            <button onClick={() => setServicesTitleGradient(!servicesTitleGradient)} className={`w-full py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${servicesTitleGradient ? 'bg-accent-cyan text-black' : 'bg-white/5 text-white/20'}`}>
              Degradado: {servicesTitleGradient ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </section>

      {/* Aliados */}
      <section className="glass p-10 rounded-[3rem] border-white/5 bg-accent-cyan/5">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <Layout className="text-accent-cyan" />
            <h2 className="text-2xl font-black uppercase tracking-tighter">Aliados (Logos)</h2>
          </div>
          <button onClick={addBrand} className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all">Añadir Marca</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="bg-black/40 p-4 rounded-3xl border border-white/5 space-y-4 group relative">
              <button onClick={() => deleteBrand(brand.id)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={12} /></button>
              <div className="h-12 flex items-center justify-center bg-white/5 rounded-xl p-2">
                {brand.logo_url && <img src={brand.logo_url} className="h-full object-contain" />}
              </div>
              <input className="w-full bg-transparent border-none p-0 text-[10px] text-white/40 text-center focus:ring-0 outline-none" value={brand.logo_url} onBlur={(e) => updateBrand(brand.id, 'logo_url', e.target.value)} onChange={(e) => setBrands(brands.map(b => b.id === brand.id ? { ...b, logo_url: e.target.value } : b))} placeholder="URL Logo" />
            </div>
          ))}
        </div>
      </section>

      {/* Servicios Manager */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-4xl font-black tracking-tighter uppercase">Listado de Servicios</h2>
          <button onClick={addService} className="px-8 py-3 glass rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border-white/10">+ Nuevo Servicio</button>
        </div>
        <div className="grid gap-8">
          {services.map((service) => (
            <div key={service.id} className="glass p-10 rounded-[3rem] border-white/5 space-y-6 hover:border-white/20 transition-all group">
              <div className="flex justify-between gap-6">
                <input className="bg-transparent text-4xl font-black w-full border-none p-0 focus:ring-0 outline-none tracking-tighter" value={service.title} onBlur={(e) => updateService(service.id, 'title', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, title: e.target.value } : s))} />
                <button onClick={() => deleteService(service.id)} className="text-red-500/20 hover:text-red-500 transition-colors"><Trash2 size={24} /></button>
              </div>
              <textarea className="bg-transparent text-white/40 text-lg w-full border-none p-0 h-24 resize-none focus:ring-0 outline-none leading-relaxed" value={service.description} onBlur={(e) => updateService(service.id, 'description', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, description: e.target.value } : s))} />
              <div className="flex items-center gap-4 pt-6 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                <Video size={14} className="text-accent-cyan" />
                <input className="w-full bg-transparent border-none p-0 focus:ring-0 outline-none" placeholder="Video Cloudinary URL" value={service.video_url} onBlur={(e) => updateService(service.id, 'video_url', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, video_url: e.target.value } : s))} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
