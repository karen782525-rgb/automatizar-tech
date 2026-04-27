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
  const [heroMainColor2, setHeroMainColor2] = useState('#ffffff');
  const [heroMainGradient, setHeroMainGradient] = useState(false);
  const [heroMainEffect, setHeroMainEffect] = useState('none');
  const [heroMainSize, setHeroMainSize] = useState('8');

  const [heroAccentColor, setHeroAccentColor] = useState('#00f2ff');
  const [heroAccentColor2, setHeroAccentColor2] = useState('#9d50bb');
  const [heroAccentGradient, setHeroAccentGradient] = useState(true);
  const [heroAccentEffect, setHeroAccentEffect] = useState('none');
  const [heroAccentSize, setHeroAccentSize] = useState('8');

  const [btnPrimaryBg, setBtnPrimaryBg] = useState('#00f2ff');
  const [btnPrimaryText, setBtnPrimaryText] = useState('#000000');
  const [btnSecondaryBorder, setBtnSecondaryBorder] = useState('#ffffff');
  const [btnSecondaryText, setBtnSecondaryText] = useState('#ffffff');

  const [marqueeLabel, setMarqueeLabel] = useState('Marcas que confían en nosotros');
  const [marqueeLabelColor, setMarqueeLabelColor] = useState('rgba(255,255,255,0.4)');
  const [marqueeLabelSize, setMarqueeLabelSize] = useState('0.75');

  const [servicesTitle, setServicesTitle] = useState('Servicios & Demos');
  const [servicesSubtitle, setServicesSubtitle] = useState('Soluciones de vanguardia para automatizar, escalar y transformar el futuro de tu negocio.');
  const [servicesTitleColor, setServicesTitleColor] = useState('#ffffff');
  const [servicesTitleColor2, setServicesTitleColor2] = useState('#ffffff');
  const [servicesTitleGradient, setServicesTitleGradient] = useState(false);
  const [servicesTitleSize, setServicesTitleSize] = useState('3');
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
          setMarqueeLabelColor(settings.find(s => s.key === 'marquee_label_color')?.value || 'rgba(255,255,255,0.4)');
          setMarqueeLabelSize(settings.find(s => s.key === 'marquee_label_size')?.value || '0.75');

          setServicesTitle(settings.find(s => s.key === 'services_title')?.value || 'Servicios & Demos');
          setServicesSubtitle(settings.find(s => s.key === 'services_subtitle')?.value || '');
          setServicesTitleColor(settings.find(s => s.key === 'services_title_color')?.value || '#ffffff');
          setServicesTitleColor2(settings.find(s => s.key === 'services_title_color_2')?.value || '#ffffff');
          setServicesTitleGradient(settings.find(s => s.key === 'services_title_gradient')?.value === 'true');
          setServicesTitleSize(settings.find(s => s.key === 'services_title_size')?.value || '3');
          setServicesTitleEffect(settings.find(s => s.key === 'services_title_effect')?.value || 'none');
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
        
        {/* Columna Izquierda: Identidad y Botones */}
        <div className="space-y-6">
          <section className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
            <h2 className="text-[10px] font-black uppercase text-accent-violet flex items-center gap-2"><Smartphone size={14}/> Identidad</h2>
            <div className="space-y-3">
               <input className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold" value={logoText} onChange={(e)=>setLogoText(e.target.value)} placeholder="Texto Logo" />
               <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2">
                     <span className="text-[8px] text-white/20 uppercase font-black">Tamaño</span>
                     <input type="number" step="0.1" className="bg-transparent text-xs w-full text-right font-bold text-accent-violet" value={logoSize} onChange={(e)=>setLogoSize(e.target.value)} />
                  </div>
                  <select className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs" value={logoEffect} onChange={(e)=>setLogoEffect(e.target.value)}>
                     <option value="none">Normal</option>
                     <option value="glow">Glow</option>
                     <option value="neon">Neon</option>
                  </select>
               </div>
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
             <h2 className="text-[10px] font-black uppercase text-accent-cyan flex items-center gap-2"><MousePointer2 size={14}/> Colores Botones</h2>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <p className="text-[8px] text-white/40 uppercase font-black ml-1">Primario</p>
                   <input type="color" value={btnPrimaryBg} onChange={(e)=>setBtnPrimaryBg(e.target.value)} className="w-full h-10 bg-black/40 rounded-xl border-none cursor-pointer" />
                </div>
                <div className="space-y-1">
                   <p className="text-[8px] text-white/40 uppercase font-black ml-1">Secundario</p>
                   <input type="color" value={btnSecondaryBorder} onChange={(e)=>setBtnSecondaryBorder(e.target.value)} className="w-full h-10 bg-black/40 rounded-xl border-none cursor-pointer" />
                </div>
             </div>
          </section>

          <section className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
             <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-black uppercase text-accent-violet flex items-center gap-2"><Globe size={14}/> Marquesina (Marcas)</h2>
                <button 
                  onClick={() => setBrands([...brands, { id: Date.now().toString(), name: 'Nueva', logo_url: '', display_order: brands.length }])}
                  className="text-[8px] font-black bg-white/5 px-2 py-1 rounded-md border border-white/10 hover:bg-white/10"
                >
                  + AÑADIR MARCA
                </button>
             </div>
             <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <p className="text-[8px] text-white/40 uppercase font-black ml-1">Texto Etiqueta</p>
                      <input className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs" value={marqueeLabel} onChange={(e)=>setMarqueeLabel(e.target.value)} />
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                         <p className="text-[8px] text-white/40 uppercase font-black ml-1">Color</p>
                         <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-[9px]" value={marqueeLabelColor} onChange={(e)=>setMarqueeLabelColor(e.target.value)} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[8px] text-white/40 uppercase font-black ml-1">Size</p>
                         <input type="number" step="0.05" className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-2 text-[9px]" value={marqueeLabelSize} onChange={(e)=>setMarqueeLabelSize(e.target.value)} />
                      </div>
                   </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                   {brands.map((b, idx) => (
                      <div key={b.id} className="relative aspect-square bg-black/60 rounded-xl overflow-hidden group border border-white/5">
                         {b.logo_url ? (
                           <img src={b.logo_url} className="w-full h-full object-contain p-2" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-[8px] text-white/10 font-bold">LOGO</div>
                         )}
                         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/90 flex flex-col items-center justify-center gap-2 p-2 transition-all">
                            <input 
                              className="w-full bg-white/5 text-[8px] p-1 rounded border border-white/10" 
                              value={b.logo_url} 
                              onChange={(e) => {
                                const newBrands = [...brands];
                                newBrands[idx].logo_url = e.target.value;
                                setBrands(newBrands);
                              }}
                              placeholder="URL Logo" 
                            />
                            <button onClick={() => setBrands(brands.filter(brand => brand.id !== b.id))} className="text-red-500">
                              <Trash2 size={12}/>
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </section>

          <section className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
             <h2 className="text-[10px] font-black uppercase text-accent-cyan flex items-center gap-2"><Type size={14}/> Estilo Sección Servicios</h2>
             <div className="space-y-4">
                <div className="flex gap-2">
                   <input className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold" value={servicesTitle} onChange={(e)=>setServicesTitle(e.target.value)} placeholder="Título Sección" />
                   <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2">
                     <span className="text-[8px] text-white/20 uppercase font-black">Tamaño</span>
                     <input type="number" step="0.1" className="bg-transparent text-xs w-10 text-right font-bold text-accent-cyan" value={servicesTitleSize} onChange={(e)=>setServicesTitleSize(e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                   <div className="space-y-1">
                      <p className="text-[7px] text-white/20 uppercase font-black">Color A</p>
                      <input type="color" value={servicesTitleColor} onChange={(e)=>setServicesTitleColor(e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-[7px] text-white/20 uppercase font-black">Color B</p>
                      <input type="color" value={servicesTitleColor2} onChange={(e)=>setServicesTitleColor2(e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-[7px] text-white/20 uppercase font-black">Efecto</p>
                      <select className="w-full bg-black/40 border border-white/10 rounded-lg px-1 py-1.5 text-[9px]" value={servicesTitleEffect} onChange={(e)=>setServicesTitleEffect(e.target.value)}>
                         <option value="none">Normal</option>
                         <option value="glow">Glow</option>
                         <option value="neon">Neon</option>
                         <option value="3d">3D</option>
                      </select>
                   </div>
                </div>
                <textarea className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-[10px] h-12 resize-none" value={servicesSubtitle} onChange={(e)=>setServicesSubtitle(e.target.value)} placeholder="Subtítulo de sección..." />
             </div>
          </section>
        </div>

        {/* Columna Derecha: Contenido Principal */}
        <div className="lg:col-span-2 space-y-6">
          
          <section className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-6">
            <h2 className="text-[10px] font-black uppercase text-accent-cyan flex items-center gap-2"><Layout size={14}/> Banner Principal</h2>
            
            {/* Video Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="space-y-1">
                  <p className="text-[8px] text-white/40 uppercase font-black ml-2">URL Video</p>
                  <input className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs" value={heroVideo} onChange={(e)=>setHeroVideo(e.target.value)} />
               </div>
               <div className="space-y-1">
                  <p className="text-[8px] text-white/40 uppercase font-black ml-2">Efecto</p>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs" value={heroEffects} onChange={(e)=>setHeroEffects(e.target.value)}>
                     <option value="none">✨ Original</option>
                     <option value="brightness(0.5)">🎬 Cine</option>
                     <option value="grayscale(1)">🌑 Noir</option>
                     <option value="contrast(1.2) sepia(0.3) hue-rotate(150deg)">🤖 Cyber</option>
                     <option value="sepia(1)">📜 Vintage</option>
                     <option value="blur(8px) brightness(0.7)">💎 Glass</option>
                  </select>
               </div>
               <div className="space-y-1">
                  <p className="text-[8px] text-white/40 uppercase font-black ml-2">Opacidad (%)</p>
                  <input type="number" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-accent-cyan font-bold" value={heroVideoOpacity} onChange={(e)=>setHeroVideoOpacity(e.target.value)} />
               </div>
            </div>

            {/* Title Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Título 1 */}
               <div className="bg-black/20 p-4 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                     <p className="text-[8px] text-white/40 uppercase font-black">Título 1 (Principal)</p>
                     <div className="flex items-center gap-2">
                        <span className="text-[8px] text-white/20 uppercase font-black">Degradado</span>
                        <input type="checkbox" checked={heroMainGradient} onChange={(e)=>setHeroMainGradient(e.target.checked)} className="accent-accent-cyan" />
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <input className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm font-black" value={heroTitleMain} onChange={(e)=>setHeroTitleMain(e.target.value)} />
                     <input type="number" step="0.5" className="w-16 bg-black/40 border border-accent-cyan/30 rounded-xl px-2 py-2 text-xs font-bold text-accent-cyan text-center" value={heroMainSize} onChange={(e)=>setHeroMainSize(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                     <div className="space-y-1">
                        <p className="text-[7px] text-white/20 uppercase font-black">Color A</p>
                        <input type="color" value={heroMainColor} onChange={(e)=>setHeroMainColor(e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[7px] text-white/20 uppercase font-black">Color B</p>
                        <input type="color" value={heroMainColor2} onChange={(e)=>setHeroMainColor2(e.target.value)} disabled={!heroMainGradient} className="w-full h-8 bg-transparent cursor-pointer disabled:opacity-20" />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[7px] text-white/20 uppercase font-black">Efecto</p>
                        <select className="w-full bg-black/40 border border-white/10 rounded-lg px-1 py-1.5 text-[9px]" value={heroMainEffect} onChange={(e)=>setHeroMainEffect(e.target.value)}>
                           <option value="none">Normal</option>
                           <option value="glow">Glow</option>
                           <option value="neon">Neon</option>
                           <option value="3d">3D</option>
                        </select>
                     </div>
                  </div>
               </div>

               {/* Título 2 */}
               <div className="bg-black/20 p-4 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                     <p className="text-[8px] text-white/40 uppercase font-black text-accent-cyan">Título 2 (Acento)</p>
                     <div className="flex items-center gap-2">
                        <span className="text-[8px] text-white/20 uppercase font-black">Degradado</span>
                        <input type="checkbox" checked={heroAccentGradient} onChange={(e)=>setHeroAccentGradient(e.target.checked)} className="accent-accent-cyan" />
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <input className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm font-black text-accent-cyan" value={heroTitleAccent} onChange={(e)=>setHeroTitleAccent(e.target.value)} />
                     <input type="number" step="0.5" className="w-16 bg-black/40 border border-accent-cyan/30 rounded-xl px-2 py-2 text-xs font-bold text-accent-cyan text-center" value={heroAccentSize} onChange={(e)=>setHeroAccentSize(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                     <div className="space-y-1">
                        <p className="text-[7px] text-white/20 uppercase font-black">Color A</p>
                        <input type="color" value={heroAccentColor} onChange={(e)=>setHeroAccentColor(e.target.value)} className="w-full h-8 bg-transparent cursor-pointer" />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[7px] text-white/20 uppercase font-black">Color B</p>
                        <input type="color" value={heroAccentColor2} onChange={(e)=>setHeroAccentColor2(e.target.value)} disabled={!heroAccentGradient} className="w-full h-8 bg-transparent cursor-pointer disabled:opacity-20" />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[7px] text-white/20 uppercase font-black">Efecto</p>
                        <select className="w-full bg-black/40 border border-white/10 rounded-lg px-1 py-1.5 text-[9px]" value={heroAccentEffect} onChange={(e)=>setHeroAccentEffect(e.target.value)}>
                           <option value="none">Normal</option>
                           <option value="glow">Glow</option>
                           <option value="neon">Neon</option>
                           <option value="3d">3D</option>
                        </select>
                     </div>
                  </div>
               </div>
            </div>

            {/* Subtitle Settings */}
            <div className="space-y-1">
               <p className="text-[8px] text-white/40 uppercase font-black ml-2">Subtítulo (Descripción)</p>
               <textarea className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs h-20 resize-none outline-none focus:border-accent-cyan/50 transition-all" value={heroSubtitle} onChange={(e)=>setHeroSubtitle(e.target.value)} placeholder="Descripción debajo del título..." />
            </div>
          </section>

          {/* SERVICIOS */}
          <section className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-black uppercase tracking-tighter">Servicios & Demos</h2>
              <button onClick={addService} className="text-[9px] font-black uppercase bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10">+ Añadir Nuevo</button>
            </div>

            <div className="grid gap-4">
              {services.map((s, idx) => (
                <div key={s.id} className="bg-white/5 border border-white/10 p-5 rounded-3xl hover:border-white/20 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <input className="bg-transparent text-lg font-black border-none p-0 focus:ring-0 w-full" value={s.title} onChange={(e) => {
                       const newServices = [...services];
                       newServices[idx].title = e.target.value;
                       setServices(newServices);
                    }} onBlur={(e)=>updateService(s.id, 'title', e.target.value)} />
                    <button onClick={()=>deleteService(s.id)} className="text-white/10 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                  
                  <textarea className="bg-transparent text-xs text-white/40 border-none p-0 w-full h-8 resize-none focus:ring-0 mb-4" value={s.description} onChange={(e) => {
                       const newServices = [...services];
                       newServices[idx].description = e.target.value;
                       setServices(newServices);
                    }} onBlur={(e)=>updateService(s.id, 'description', e.target.value)} />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5">
                      <FileText size={12} className="text-accent-violet shrink-0" />
                      <input className="bg-transparent text-[9px] w-full outline-none" placeholder="Texto Botón Demo" value={s.button_text} onChange={(e) => {
                        const newServices = [...services];
                        newServices[idx].button_text = e.target.value;
                        setServices(newServices);
                      }} onBlur={(e)=>updateService(s.id, 'button_text', e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5">
                      <Globe size={12} className="text-accent-cyan shrink-0" />
                      <input className="bg-transparent text-[9px] w-full outline-none" placeholder="URL de la Demo" value={s.button_url} onChange={(e) => {
                        const newServices = [...services];
                        newServices[idx].button_url = e.target.value;
                        setServices(newServices);
                      }} onBlur={(e)=>updateService(s.id, 'button_url', e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5">
                      <Video size={12} className="text-white/20 shrink-0" />
                      <input className="bg-transparent text-[9px] w-full outline-none" placeholder="URL Video" value={s.video_url} onChange={(e) => {
                        const newServices = [...services];
                        newServices[idx].video_url = e.target.value;
                        setServices(newServices);
                      }} onBlur={(e)=>updateService(s.id, 'video_url', e.target.value)} />
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
