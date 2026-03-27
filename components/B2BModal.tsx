import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Send } from 'lucide-react';

interface B2BModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─────────────────────────────────────────────
// ⚙️  EmailJS Configuration — fill in your keys
// ─────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY    = 'YOUR_EMAILJS_PUBLIC_KEY';
const EMAILJS_SERVICE_ID    = 'YOUR_EMAILJS_SERVICE_ID';
const EMAILJS_TEMPLATE_ID   = 'YOUR_EMAILJS_TEMPLATE_ID';

const businessTypes = [
  { value: '', label: 'Tipo de negocio / Business Type' },
  { value: 'retail',       label: 'Retail / Tienda' },
  { value: 'restaurant',   label: 'Restaurante / Restaurant' },
  { value: 'distributor',  label: 'Distribuidor / Distributor' },
  { value: 'hotel',        label: 'Hotel / Hospitality' },
  { value: 'ecommerce',    label: 'E-commerce' },
  { value: 'other',        label: 'Otro / Other' },
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  country: string;
  businessType: string;
  message: string;
}

export const B2BModal: React.FC<B2BModalProps> = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [form, setForm] = useState<FormData>({
    name: '', email: '', country: '', businessType: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    // ── EmailJS integration ──────────────────────────────
    // Uncomment and install emailjs-com: npm install emailjs-com
    // import emailjs from 'emailjs-com';
    // try {
    //   await emailjs.send(
    //     EMAILJS_SERVICE_ID,
    //     EMAILJS_TEMPLATE_ID,
    //     { from_name: form.name, from_email: form.email, country: form.country,
    //       business_type: form.businessType, message: form.message },
    //     EMAILJS_PUBLIC_KEY
    //   );
    //   setFormState('success');
    // } catch {
    //   setFormState('error');
    // }
    // ────────────────────────────────────────────────────

    // Simulate for now (remove once EmailJS is wired)
    await new Promise((res) => setTimeout(res, 1800));
    setFormState('success');
  };

  const handleClose = () => {
    setFormState('idle');
    setForm({ name: '', email: '', country: '', businessType: '', message: '' });
    onClose();
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-cream placeholder-white/30 text-sm focus:outline-none focus:border-mango/60 focus:bg-white/10 transition-all duration-300";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-8 pb-4">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-mango font-bold mb-2">Programa B2B</span>
                <h2 className="text-3xl font-display uppercase tracking-tighter text-cream">Vender</h2>
                <p className="text-white/50 text-sm mt-1">Distribución y venta mayorista de Chili Jungle.</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-8 pb-8">
              <AnimatePresence mode="wait">
                {/* ── SUCCESS ── */}
                {formState === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center gap-4"
                  >
                    <CheckCircle size={52} className="text-green-400" />
                    <h3 className="text-2xl font-display uppercase tracking-tight text-cream">¡Mensaje Enviado!</h3>
                    <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                      Gracias por tu interés. Nuestro equipo de ventas te contactará en las próximas 24–48 horas.
                      <br /><br />
                      <span className="text-white/40 text-xs italic">Thank you! Our sales team will reach out within 24–48 hours.</span>
                    </p>
                    <button onClick={handleClose} className="mt-4 px-8 py-3 rounded-full bg-mango text-black font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all">
                      Cerrar
                    </button>
                  </motion.div>
                )}

                {/* ── ERROR ── */}
                {formState === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center gap-4"
                  >
                    <AlertCircle size={52} className="text-red-400" />
                    <h3 className="text-2xl font-display uppercase tracking-tight text-cream">Error al Enviar</h3>
                    <p className="text-white/60 text-sm">
                      Por favor intenta de nuevo o escríbenos directamente a{' '}
                      <a href="mailto:sales@chilijungle.com" className="text-mango underline">sales@chilijungle.com</a>
                    </p>
                    <button onClick={() => setFormState('idle')} className="mt-4 px-8 py-3 rounded-full border border-white/20 text-cream font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                      Reintentar
                    </button>
                  </motion.div>
                )}

                {/* ── FORM ── */}
                {(formState === 'idle' || formState === 'loading') && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Nombre / Name"
                        className={inputClass}
                      />
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                        className={inputClass}
                      />
                    </div>
                    <input
                      name="country"
                      type="text"
                      value={form.country}
                      onChange={handleChange}
                      required
                      placeholder="País / Country"
                      className={inputClass}
                    />
                    <select
                      name="businessType"
                      value={form.businessType}
                      onChange={handleChange}
                      required
                      className={`${inputClass} cursor-pointer`}
                    >
                      {businessTypes.map((bt) => (
                        <option key={bt.value} value={bt.value} disabled={bt.value === ''} className="bg-[#1A1A1A] text-white">
                          {bt.label}
                        </option>
                      ))}
                    </select>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Cuéntanos sobre tu negocio / Tell us about your business..."
                      className={`${inputClass} resize-none`}
                    />

                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-[#C7432A] to-mango text-white font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowedactive:scale-95"
                    >
                      {formState === 'loading' ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Enviar Consulta
                        </>
                      )}
                    </button>

                    <p className="text-center text-[10px] text-white/30 tracking-widest pt-2">
                      Al enviar, aceptas ser contactado por nuestro equipo de ventas.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
