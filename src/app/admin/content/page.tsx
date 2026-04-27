'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Video, FileText, Type, Palette, Layout, Maximize, Smartphone, MousePointer2, Briefcase, Globe } from 'lucide-react';

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
    else alert('Contenido guardado exitosamente');
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

  if (loading) return <div className="p-24 text-center text-white/20 uppercase tracking-widest font-black animate-pulse">Sincronizando...</div>;

  return (
    <div className="space-y-8 pb-24 max-w-6xl mx-auto px-4">
      <header className="flex items-center justify-between gap-6 pt-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic">CMS Dashboard</h1>
          <p className="text-[10px] text-accent-cyan uppercase tracking-[0.4em] font-bold">Automatizar.tech Admin</p>
        </div>
        <button onClick={saveAll} disabled={saving} className="px-10 py-4 bg-white text-black font-black rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all uppercase text-[10px] tracking-widest shadow-xl">
          <Save size={16} /> {saving ? 'Guardando...' : 'Publicar Todo'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Styles & Brand */}
        <div className="lg:col-span-1 space-y-8">
          {/* Identidad */}
          <section className="glass p-6 rounded-[2rem] border-white/5 space-y-6">
            <div className="flex items-center gap-3 text-accent-violet">
              <Smartphone size={20} />
              <h2 className="text-xs font-black uppercase tracking-widest">Identidad Visual</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-white/20 uppercase ml-1">Texto Logo</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none font-bold text-sm focus:border-accent-violet" value={logoText} onChange={(e) => setLogoText(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-white/20 uppercase ml-1">Tamaño</label>
                  <input type="number" step="0.1" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none font-bold text-xs" value={logoSize} onChange={(e) => setLogoSize(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-white/20 uppercase ml-1">Efecto</label>
                  <select value={logoEffect} onChange={(e) => setLogoEffect(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none font-bold text-xs">
                    <option value="none">Limpio</option>
                    <option value="glow">Glow</option>
                    <option value="neon">Neon</option>
                    <option value="3d">3D</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Botones Globales */}
          <section className="glass p-6 rounded-[2rem] border-white/5 space-y-6">
            <div className="flex items-center gap-3 text-accent-cyan">
              <MousePointer2 size={20} />
              <h2 className="text-xs font-black uppercase tracking-widest">Botones</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-[9px] font-black text-white/20 uppercase text-center">Primario</p>
                <div className="flex gap-2">
                  <input type="color" value={btnPrimaryBg} onChange={(e) => setBtnPrimaryBg(e.target.value)} className="h-8 w-full bg-transparent cursor-pointer rounded-lg" title="Fondo" />
                  <input type="color" value={btnPrimaryText} onChange={(e) => setBtnPrimaryText(e.target.value)} className="h-8 w-full bg-transparent cursor-pointer rounded-lg" title="Texto" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-black text-white/20 uppercase text-center">Secundario</p>
                <div className="flex gap-2">
                  <input type="color" value={btnSecondaryBorder} onChange={(e) => setBtnSecondaryBorder(e.target.value)} className="h-8 w-full bg-transparent cursor-pointer rounded-lg" title="Borde" />
                  <input type="color" value={btnSecondaryText} onChange={(e) => setBtnSecondaryText(e.target.value)} className="h-8 w-full bg-transparent cursor-pointer rounded-lg" title="Texto" />
                </div>
              </div>
            </div>
          </section>

          {/* Aliados Compact */}
          <section className="glass p-6 rounded-[2rem] border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-widest text-white/40">Aliados</h2>
              <button onClick={() => updateBrand('', 'display_order', brands.length + 1)} className="text-accent-cyan hover:scale-110 transition-all"><Plus size={16}/></button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {brands.map((brand) => (
                <div key={brand.id} className="relative aspect-square bg-black/40 rounded-xl border border-white/5 group overflow-hidden">
                   <img src={brand.logo_url} className="w-full h-full object-contain p-2" />
                   <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-all">
                     <button onClick={() => deleteBrand(brand.id)} className="text-red-500"><Trash2 size={12} /></button>
                     <input className="w-full bg-transparent text-[8px] text-center border-none focus:ring-0" placeholder="URL" value={brand.logo_url} onBlur={(e) => updateBrand(brand.id, 'logo_url', e.target.value)} />
                   </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Banner Hero Manager */}
          <section className="glass p-8 rounded-[2.5rem] border-white/5 space-y-8">
            <div className="flex items-center gap-3">
              <Layout className="text-accent-cyan" />
              <h2 className="text-xl font-black uppercase tracking-tighter italic">Banner Principal</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-white/20 uppercase ml-1">Video Background (Cloudinary URL)</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none font-medium text-sm text-accent-cyan" value={heroVideo} onChange={(e) => setHeroVideo(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-white/20 uppercase ml-1">Efectos Visuales</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none font-medium text-sm" value={heroEffects} onChange={(e) => setHeroEffects(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/40 p-6 rounded-2xl border border-white/5">
              <div className="space-y-3">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest border-b border-white/5 pb-2 italic">Typography A</p>
                <input className="w-full bg-transparent border-none p-0 text-xl font-black outline-none" value={heroTitleMain} onChange={(e) => setHeroTitleMain(e.target.value)} />
                <div className="flex items-center gap-4">
                  <input type="color" value={heroMainColor} onChange={(e) => setHeroMainColor(e.target.value)} className="h-6 w-6 bg-transparent" />
                  <input type="number" step="0.5" className="bg-white/5 border border-white/10 w-12 text-center text-xs rounded py-1" value={heroMainSize} onChange={(e) => setHeroMainSize(e.target.value)} />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[9px] font-black text-accent-cyan/30 uppercase tracking-widest border-b border-white/5 pb-2 italic">Typography B</p>
                <input className="w-full bg-transparent border-none p-0 text-xl font-black outline-none text-accent-cyan" value={heroTitleAccent} onChange={(e) => setHeroTitleAccent(e.target.value)} />
                <div className="flex items-center gap-4">
                  <input type="color" value={heroAccentColor} onChange={(e) => setHeroAccentColor(e.target.value)} className="h-6 w-6 bg-transparent" />
                  <input type="number" step="0.5" className="bg-white/5 border border-white/10 w-12 text-center text-xs rounded py-1 text-accent-cyan" value={heroAccentSize} onChange={(e) => setHeroAccentSize(e.target.value)} />
                </div>
              </div>
            </div>
          </section>

          {/* Servicios Manager COMPACT */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black tracking-tighter uppercase italic">Servicios</h2>
              <button onClick={addService} className="flex items-center gap-2 px-6 py-2 glass rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white/10 border-white/10 transition-all">+ Añadir</button>
            </div>
            <div className="grid gap-4">
              {services.map((service) => (
                <div key={service.id} className="glass p-6 rounded-[2rem] border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow space-y-4">
                      <div className="flex items-center gap-4">
                        <input className="bg-transparent text-xl font-black w-full border-none p-0 focus:ring-0 outline-none tracking-tight" value={service.title} onBlur={(e) => updateService(service.id, 'title', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, title: e.target.value } : s))} />
                        <button onClick={() => deleteService(service.id)} className="text-white/10 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                      </div>
                      <textarea className="bg-transparent text-white/40 text-xs w-full border-none p-0 h-12 resize-none focus:ring-0 outline-none" value={service.description} onBlur={(e) => updateService(service.id, 'description', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, description: e.target.value } : s))} />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-[8px] font-black uppercase text-white/20">
                          <FileText size={12} className="text-accent-violet shrink-0" />
                          <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-white/60" placeholder="Texto Botón" value={service.button_text} onBlur={(e) => updateService(service.id, 'button_text', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, button_text: e.target.value } : s))} />
                        </div>
                        <div className="flex items-center gap-2 text-[8px] font-black uppercase text-white/20">
                          <Globe size={12} className="text-accent-cyan shrink-0" />
                          <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-white/60" placeholder="Link Demo" value={service.button_url} onBlur={(e) => updateService(service.id, 'button_url', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, button_url: e.target.value } : s))} />
                        </div>
                        <div className="flex items-center gap-2 text-[8px] font-black uppercase text-white/20">
                          <Video size={12} className="text-accent-cyan shrink-0" />
                          <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-white/60" placeholder="URL Video" value={service.video_url} onBlur={(e) => updateService(service.id, 'video_url', e.target.value)} onChange={(e) => setServices(services.map(s => s.id === service.id ? { ...s, video_url: e.target.value } : s))} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
