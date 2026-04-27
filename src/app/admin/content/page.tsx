'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Video, FileText, Smartphone, Layout, MousePointer2, Briefcase, Globe, Type } from 'lucide-react';

export default function ContentPage() {
  const [heroVideo, setHeroVideo] = useState('');
  const [heroEffects, setHeroEffects] = useState('');
  const [heroVideoOpacity, setHeroVideoOpacity] = useState('40');
  const [heroTitleMain, setHeroTitleMain] = useState('');
  const [heroTitleAccent, setHeroTitleAccent] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  
  const [logoText, setLogoText] = useState('automatizar.tech');
  const [logoColor, setLogoColor] = useState('#00f2ff');
  const [logoColor2, setLogoColor2] = useState('#9d50bb');
  const [logoGradient, setLogoGradient] = useState(true);
  const [logoEffect, setLogoEffect] = useState('none');
  const [logoSize, setLogoSize] = useState('1.5');

  const [heroMainColor, setHeroMainColor] = useState('#ffffff');
  const [heroMainSize, setHeroMainSize] = useState('8');
  const [heroAccentColor, setHeroAccentColor] = useState('#00f2ff');
  const [heroAccentSize, setHeroAccentSize] = useState('8');

  const [btnPrimaryBg, setBtnPrimaryBg] = useState('#00f2ff');
  const [btnPrimaryText, setBtnPrimaryText] = useState('#000000');
  const [btnSecondaryBorder, setBtnSecondaryBorder] = useState('#ffffff');
  const [btnSecondaryText, setBtnSecondaryText] = useState('#ffffff');

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
          setHeroEffects(settings.find(s => s.key === 'hero_video_effects')?.value || 'none');
          setHeroVideoOpacity(settings.find(s => s.key === 'hero_video_opacity')?.value || '40');
          setHeroTitleMain(settings.find(s => s.key === 'hero_title_main')?.value || 'Potenciamos tu Equipo con');
          setHeroTitleAccent(settings.find(s => s.key === 'hero_title_accent')?.value || 'Inteligencia Artificial');
          setHeroSubtitle(settings.find(s => s.key === 'hero_subtitle')?.value || '');
          setLogoText(settings.find(s => s.key === 'logo_text')?.value || 'automatizar.tech');
          setLogoColor(settings.find(s => s.key === 'logo_color')?.value || '#00f2ff');
          setLogoColor2(settings.find(s => s.key === 'logo_color_2')?.value || '#9d50bb');
          setLogoGradient(settings.find(s => s.key === 'logo_gradient')?.value === 'true');
          setLogoEffect(settings.find(s => s.key === 'logo_effect')?.value || 'none');
          setLogoSize(settings.find(s => s.key === 'logo_size')?.value || '1.5');
          setHeroMainColor(settings.find(s => s.key === 'hero_main_color')?.value || '#ffffff');
          setHeroMainSize(settings.find(s => s.key === 'hero_main_size')?.value || '8');
          setHeroAccentColor(settings.find(s => s.key === 'hero_accent_color')?.value || '#00f2ff');
          setHeroAccentSize(settings.find(s => s.key === 'hero_accent_size')?.value || '8');
          setBtnPrimaryBg(settings.find(s => s.key === 'btn_primary_bg')?.value || '#00f2ff');
          setBtnPrimaryText(settings.find(s => s.key === 'btn_primary_text')?.value || '#000000');
          setBtnSecondaryBorder(settings.find(s => s.key === 'btn_secondary_border')?.value || '#ffffff');
          setBtnSecondaryText(settings.find(s => s.key === 'btn_secondary_text')?.value || '#ffffff');
        }
        const { data: svcs } = await supabase.from('services').select('*').order('display_order');
        setServices(svcs || []);
        const { data: bnds } = await supabase.from('brands').select('*').order('display_order');
        setBrands(bnds || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    fetchData();
  }, []);

  const saveAll = async () => {
    setSaving(true);
    const updates = [
      { key: 'hero_video_url', value: heroVideo },
      { key: 'hero_video_effects', value: heroEffects },
      { key: 'hero_video_opacity', value: heroVideoOpacity },
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
      { key: 'hero_main_size', value: heroMainSize },
      { key: 'hero_accent_color', value: heroAccentColor },
      { key: 'hero_accent_size', value: heroAccentSize },
      { key: 'btn_primary_bg', value: btnPrimaryBg },
      { key: 'btn_primary_text', value: btnPrimaryText },
      { key: 'btn_secondary_border', value: btnSecondaryBorder },
      { key: 'btn_secondary_text', value: btnSecondaryText },
    ];
    await supabase.from('site_settings').upsert(updates);
    setSaving(false);
    alert('¡Contenido actualizado!');
  };

  const updateService = async (id: string, field: string, value: any) => {
    await supabase.from('services').update({ [field]: value }).eq('id', id);
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const deleteService = async (id: string) => {
    if (!confirm('¿Eliminar?')) return;
    await supabase.from('services').delete().eq('id', id);
    setServices(services.filter(s => s.id !== id));
  };

  const addService = async () => {
    const { data } = await supabase.from('services').insert([{ title: 'Nuevo', description: '' }]).select();
    if (data) setServices([...services, data[0]]);
  };

  const updateBrand = async (id: string, field: string, value: any) => {
    await supabase.from('brands').update({ [field]: value }).eq('id', id);
    setBrands(brands.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  if (loading) return <div className="p-24 text-center text-white/20 font-black">CARGANDO...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 space-y-10">
      <header className="flex justify-between items-center max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-black italic">CMS v2.0</h1>
          <p className="text-[10px] text-accent-cyan uppercase tracking-widest">Panel de Control Compacto</p>
        </div>
        <button onClick={saveAll} disabled={saving} className="bg-white text-black px-8 py-3 rounded-xl font-black uppercase text-[10px] flex items-center gap-2 hover:scale-105 transition-all">
          <Save size={14}/> {saving ? 'Guardando...' : 'Publicar Todo'}
        </button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Izquierda: Estilos Rápidos */}
        <div className="space-y-6">
          <section className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
            <h2 className="text-[10px] font-black uppercase text-accent-violet flex items-center gap-2"><Smartphone size={14}/> Identidad</h2>
            <input className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold" value={logoText} onChange={(e)=>setLogoText(e.target.value)} placeholder="Texto Logo" />
            <div className="grid grid-cols-2 gap-2">
               <input type="number" className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs" value={logoSize} onChange={(e)=>setLogoSize(e.target.value)} />
               <select className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs" value={logoEffect} onChange={(e)=>setLogoEffect(e.target.value)}>
                  <option value="none">Normal</option>
                  <option value="glow">Glow</option>
                  <option value="neon">Neon</option>
               </select>
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
             <h2 className="text-[10px] font-black uppercase text-accent-cyan flex items-center gap-2"><MousePointer2 size={14}/> Botones</h2>
             <div className="grid grid-cols-2 gap-4">
                <input type="color" value={btnPrimaryBg} onChange={(e)=>setBtnPrimaryBg(e.target.value)} className="w-full h-8 bg-transparent" />
                <input type="color" value={btnSecondaryBorder} onChange={(e)=>setBtnSecondaryBorder(e.target.value)} className="w-full h-8 bg-transparent" />
             </div>
          </section>

          <section className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
             <h2 className="text-[10px] font-black uppercase text-white/20">Aliados</h2>
             <div className="grid grid-cols-4 gap-2">
                {brands.map(b => (
                   <div key={b.id} className="relative aspect-square bg-black/60 rounded-lg overflow-hidden group">
                      <img src={b.logo_url} className="w-full h-full object-contain p-1" />
                      <input className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/90 text-[8px] text-center" value={b.logo_url} onBlur={(e)=>updateBrand(b.id, 'logo_url', e.target.value)} placeholder="URL" />
                   </div>
                ))}
             </div>
          </section>
        </div>

        {/* Columna Derecha: Contenido y Servicios */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Hero Manager Compact */}
          <section className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
            <h2 className="text-[10px] font-black uppercase text-accent-cyan flex items-center gap-2"><Layout size={14}/> Banner Principal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <input className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs col-span-1 md:col-span-1" value={heroVideo} onChange={(e)=>setHeroVideo(e.target.value)} placeholder="URL Video Background" />
               <select className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs" value={heroEffects} onChange={(e)=>setHeroEffects(e.target.value)}>
                  <option value="none">✨ Original</option>
                  <option value="brightness(0.5)">🎬 Cine (Oscuro)</option>
                  <option value="grayscale(1)">🌑 Noir (B&N)</option>
                  <option value="contrast(1.2) sepia(0.3) hue-rotate(150deg)">🤖 Cyber (Futurista)</option>
                  <option value="sepia(1)">📜 Vintage (Cálido)</option>
                  <option value="blur(8px) brightness(0.7)">💎 Glass (Difuminado)</option>
               </select>
               <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-4 py-2">
                  <span className="text-[10px] text-white/40 uppercase font-black">Opacidad</span>
                  <input type="number" min="0" max="100" className="bg-transparent text-xs w-full outline-none font-bold text-accent-cyan text-right" value={heroVideoOpacity} onChange={(e)=>setHeroVideoOpacity(e.target.value)} />
                  <span className="text-[10px] text-white/20">%</span>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <input className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm font-black" value={heroTitleMain} onChange={(e)=>setHeroTitleMain(e.target.value)} />
               <input className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm font-black text-accent-cyan" value={heroTitleAccent} onChange={(e)=>setHeroTitleAccent(e.target.value)} />
            </div>
          </section>

          {/* SERVICIOS - VERSION ULTRA COMPACTA */}
          <section className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-black uppercase tracking-tighter">Servicios & Demos</h2>
              <button onClick={addService} className="text-[9px] font-black uppercase bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10">+ Añadir Nuevo</button>
            </div>

            <div className="grid gap-4">
              {services.map((s) => (
                <div key={s.id} className="bg-white/5 border border-white/10 p-5 rounded-3xl hover:border-white/20 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <input className="bg-transparent text-lg font-black border-none p-0 focus:ring-0 w-full" value={s.title} onBlur={(e)=>updateService(s.id, 'title', e.target.value)} onChange={(e)=>setServices(services.map(ser => ser.id === s.id ? {...ser, title: e.target.value} : ser))} />
                    <button onClick={()=>deleteService(s.id)} className="text-white/10 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                  
                  <textarea className="bg-transparent text-xs text-white/40 border-none p-0 w-full h-8 resize-none focus:ring-0 mb-4" value={s.description} onBlur={(e)=>updateService(s.id, 'description', e.target.value)} onChange={(e)=>setServices(services.map(ser => ser.id === s.id ? {...ser, description: e.target.value} : ser))} placeholder="Descripción corta..." />

                  {/* CAMPOS DE DEMO Y VIDEO (AQUÍ ESTÁN) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5">
                      <FileText size={12} className="text-accent-violet shrink-0" />
                      <input className="bg-transparent text-[9px] w-full outline-none" placeholder="Texto Botón Demo" value={s.button_text} onBlur={(e)=>updateService(s.id, 'button_text', e.target.value)} onChange={(e)=>setServices(services.map(ser => ser.id === s.id ? {...ser, button_text: e.target.value} : ser))} />
                    </div>
                    <div className="flex items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5">
                      <Globe size={12} className="text-accent-cyan shrink-0" />
                      <input className="bg-transparent text-[9px] w-full outline-none" placeholder="URL de la Demo" value={s.button_url} onBlur={(e)=>updateService(s.id, 'button_url', e.target.value)} onChange={(e)=>setServices(services.map(ser => ser.id === s.id ? {...ser, button_url: e.target.value} : ser))} />
                    </div>
                    <div className="flex items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5">
                      <Video size={12} className="text-white/20 shrink-0" />
                      <input className="bg-transparent text-[9px] w-full outline-none" placeholder="URL Video" value={s.video_url} onBlur={(e)=>updateService(s.id, 'video_url', e.target.value)} onChange={(e)=>setServices(services.map(ser => ser.id === s.id ? {...ser, video_url: e.target.value} : ser))} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
