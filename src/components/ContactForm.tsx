'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Send, CheckCircle2 } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    need: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Guardar en Supabase
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([formData]);

      if (supabaseError) throw supabaseError;

      // 2. Enviar a n8n
      await fetch('https://paneln8n.automatizar.tech/form/b36a9e47-1f38-4b4a-a523-c6c654abd18d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
      setFormData({ name: '', company: '', email: '', phone: '', need: '' });
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al enviar el formulario. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-24 px-8 max-w-4xl mx-auto">
      <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/10 relative overflow-hidden">
        {/* Decorative Light */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-violet/20 blur-[100px] rounded-full" />
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter">
            ¿Listo para <span className="text-accent-violet">automatizar?</span>
          </h2>

          {submitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <CheckCircle2 size={64} className="text-accent-cyan mb-4" />
              <h3 className="text-2xl font-bold mb-2">¡Mensaje Recibido!</h3>
              <p className="text-white/60">Nos pondremos en contacto contigo pronto.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-accent-cyan text-sm font-bold underline"
              >
                Enviar otro mensaje
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Nombre</label>
                  <input
                    required
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-cyan transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Empresa</label>
                  <input
                    type="text"
                    placeholder="Tu empresa"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-cyan transition-colors"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="email@ejemplo.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-cyan transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Teléfono / WhatsApp</label>
                  <input
                    required
                    type="tel"
                    placeholder="+57 300 000 0000"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-cyan transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">¿Qué necesitas?</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-cyan transition-colors resize-none"
                  value={formData.need}
                  onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-accent-violet to-[#9d50bb] text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(112,0,255,0.3)] transition-all disabled:opacity-50"
              >
                {loading ? 'Enviando...' : (
                  <>
                    <span>Enviar Solicitud</span>
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
