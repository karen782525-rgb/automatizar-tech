import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ContactForm from '@/components/ContactForm';
import Chatbot from '@/components/Chatbot';
import { supabase } from '@/lib/supabase';

export const revalidate = 0; // Disable cache for immediate CMS updates

async function getServices() {
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });
  return services || [];
}

async function getSettings() {
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*');
  
  const settingsMap: Record<string, string> = {};
  settings?.forEach(s => {
    settingsMap[s.key] = s.value;
  });
  return settingsMap;
}

export default async function Home() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSettings()
  ]);

  const { data: brands } = await supabase.from('brands').select('*').order('display_order');

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent-cyan selection:text-black">
      <Navbar />
      <Hero 
        videoUrl={settings.hero_video_url} 
        effects={settings.hero_video_effects}
        titleMain={settings.hero_title_main}
        titleAccent={settings.hero_title_accent}
        subtitle={settings.hero_subtitle}
        
        // Estilos Main
        mainColor={settings.hero_main_color}
        mainColor2={settings.hero_main_color_2}
        mainGradient={settings.hero_main_gradient === 'true'}
        mainEffect={settings.hero_main_effect}

        // Estilos Accent
        accentColor={settings.hero_accent_color}
        accentColor2={settings.hero_accent_color_2}
        accentGradient={settings.hero_accent_gradient === 'true'}
        accentEffect={settings.hero_accent_effect}

        titleSize={settings.hero_title_size}
        brands={brands || []}
      />
      
      {/* Background Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-cyan/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-violet/10 blur-[120px] rounded-full" />
      </div>

      <Services services={services} />
      
      <ContactForm />

      <footer className="py-12 px-8 border-t border-white/5 text-center text-white/20 text-sm">
        <p>© {new Date().getFullYear()} automatizar.tech. Todos los derechos reservados.</p>
        <p className="mt-2 tracking-widest uppercase text-[10px]">Liderando la revolución de la IA</p>
      </footer>

      <Chatbot />
    </main>
  );
}
