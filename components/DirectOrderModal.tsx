import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, ShoppingBag, Plus, Minus } from 'lucide-react';
import { calculateOrderTotals } from '../lib/pricing';

interface DirectOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: 'classic' | 'tropical' | null;
  source?: string;
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  province: string;
  canton: string;
  district: string;
  address: string;
  deliveryMethod: string;
  notes: string;
}

export const DirectOrderModal: React.FC<DirectOrderModalProps> = ({ isOpen, onClose, initialProduct, source }) => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  
  const [clasicoQty, setClasicoQty] = useState(0);
  const [tropicalQty, setTropicalQty] = useState(0);
  
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', province: '', canton: '', district: '', address: '', deliveryMethod: 'home', notes: ''
  });

  // Pre-fill quantities based on initialProduct prop when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialProduct === 'classic') {
         setClasicoQty(1); setTropicalQty(0);
      } else if (initialProduct === 'tropical') {
         setTropicalQty(1); setClasicoQty(0);
      } else {
         setClasicoQty(0); setTropicalQty(0);
      }
      setFormState('idle');
      setErrorMsg('');
      setForm({ name: '', email: '', phone: '', province: '', canton: '', district: '', address: '', deliveryMethod: 'home', notes: '' });
    }
  }, [isOpen, initialProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const increment = (setter: React.Dispatch<React.SetStateAction<number>>, val: number) => setter(val + 1);
  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>, val: number) => setter(val > 0 ? val - 1 : 0);

  const { totalUnits, totalUSD, totalCRC, bundlePairs, remainingSingles, savingsUSD, savingsCRC, avgCRC } = calculateOrderTotals(clasicoQty, tropicalQty);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalUnits === 0) {
      setErrorMsg("Selecciona al menos un producto");
      return;
    }
    setErrorMsg('');
    setFormState('loading');

    try {
      const payload = { ...form, clasicoQty, tropicalQty, source };
      const res = await fetch('/api/direct-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const { error, message } = await res.json();
        const isTechnicalError = message && (message.includes('`') || message.includes('Invalid') || message.includes('API'));
        const displayMsg = isTechnicalError ? "Hubo un problema temporal con el servidor de correos. Por favor envíanos un WhatsApp." : (message || error);
        throw new Error(displayMsg || 'Unknown error');
      }

      setFormState('success');
    } catch (err: any) {
      console.error('[DirectOrderModal] Submit error:', err);
      setErrorMsg(err.message || 'Ocurrió un error inesperado al enviar el pedido.');
      setFormState('error');
    }
  };

  const handleClose = () => {
    if (formState === 'loading') return; // Prevent closing while submitting
    onClose();
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-cream placeholder-white/30 text-sm focus:outline-none focus:border-mango/60 focus:bg-white/10 transition-all duration-300";
  const labelClass = "block text-[10px] uppercase tracking-widest text-white/50 mb-2 font-bold";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

          {/* Modal Container */}
          <motion.div
            className="relative z-10 w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Sticky */}
            <div className="flex items-start justify-between p-6 md:p-8 pb-4 border-b border-white/5 shrink-0 bg-[#0A0A0A] z-20">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-flame font-bold mb-2 flex items-center gap-2">
                  <ShoppingBag size={12} /> Pedido Directo
                </span>
                <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tighter text-cream leading-none">Generar Orden</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all"
                disabled={formState === 'loading'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto px-6 md:px-8 py-6 custom-scrollbar relative">
              <AnimatePresence mode="wait">
                
                {/* ── SUCCESS ── */}
                {formState === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-4 h-full"
                  >
                    <CheckCircle size={64} className="text-jungle mb-4" />
                    <h3 className="text-3xl font-display uppercase tracking-tight text-cream">🔥 Pedido recibido, {form.name.split(' ')[0]}</h3>
                    <p className="text-white/70 text-base leading-relaxed max-w-md">
                      Nuestro equipo revisará tu orden y te contactará en las próximas 24–48 horas para coordinar entrega y método de pago.
                    </p>
                    <p className="text-white/70 text-base leading-relaxed max-w-md mb-6">
                      Gracias por confiar en Chili Jungle.
                    </p>
                    <div className="flex flex-col items-center gap-1 my-4">
                       <span className="text-cream text-sm uppercase tracking-widest font-bold">— Spice from Paradise Team</span>
                       <span className="text-white/40 text-xs italic font-serif mt-1">From spicy lovers for spicy lovers</span>
                    </div>
                    <button onClick={handleClose} className="mt-8 px-12 py-4 rounded-full bg-jungle text-white font-bold uppercase tracking-widest text-sm hover:brightness-110 hover:-translate-y-1 transition-all shadow-lg">
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
                    className="flex flex-col items-center justify-center py-16 text-center gap-4"
                  >
                    <AlertCircle size={64} className="text-flame mb-4" />
                    <h3 className="text-3xl font-display uppercase tracking-tight text-cream">Error al Enviar</h3>
                    <p className="text-white/60 text-base max-w-md">
                      {errorMsg || "Por favor intenta de nuevo o escríbenos directamente a ventas."}
                    </p>
                    <button onClick={() => setFormState('idle')} className="mt-8 px-10 py-4 rounded-full border border-white/20 text-cream font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all">
                      Reintentar
                    </button>
                  </motion.div>
                )}

                {/* ── FORM ── */}
                {(formState === 'idle' || formState === 'loading') && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* SECTION A & B combined for mobile grace: Products and Info side by side on desktop? Vertical is safer */}
                    
                    {/* SECTION B - Product Selection */}
                    <section>
                      <h3 className="text-lg font-display uppercase text-mango border-b border-white/10 pb-2 mb-6">1. Tu Selección</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Classic Selector */}
                        <div className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center gap-4">
                           <div className="flex flex-col items-center gap-3">
                             <img src="/images/bottle-classic.png" alt="Clásico" className="h-28 object-contain drop-shadow-[0_0_15px_rgba(199,67,42,0.4)]" />
                             <div>
                               <p className="text-cream font-bold tracking-widest uppercase text-xl">Clásico</p>
                               <p className="text-white/40 text-sm mt-1">$10 / ₡5K c/u</p>
                             </div>
                           </div>
                           <div className="flex items-center justify-between w-full max-w-[160px] bg-black rounded-xl border border-white/10 p-1.5 mt-2">
                              <button type="button" onClick={() => decrement(setClasicoQty, clasicoQty)} className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors active:scale-95"><Minus size={18}/></button>
                              <span className="w-10 text-center text-cream font-bold text-xl">{clasicoQty}</span>
                              <button type="button" onClick={() => increment(setClasicoQty, clasicoQty)} className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors text-flame active:scale-95"><Plus size={18}/></button>
                           </div>
                        </div>

                        {/* Tropical Selector */}
                        <div className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center gap-4">
                           <div className="flex flex-col items-center gap-3">
                             <img src="/images/bottle-tropical.png" alt="Tropical" className="h-28 object-contain drop-shadow-[0_0_15px_rgba(31,78,51,0.5)]" />
                             <div>
                               <p className="text-cream font-bold tracking-widest uppercase text-xl">Tropical</p>
                               <p className="text-white/40 text-sm mt-1">$10 / ₡5K c/u</p>
                             </div>
                           </div>
                           <div className="flex items-center justify-between w-full max-w-[160px] bg-black rounded-xl border border-white/10 p-1.5 mt-2">
                              <button type="button" onClick={() => decrement(setTropicalQty, tropicalQty)} className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors active:scale-95"><Minus size={18}/></button>
                              <span className="w-10 text-center text-cream font-bold text-xl">{tropicalQty}</span>
                              <button type="button" onClick={() => increment(setTropicalQty, tropicalQty)} className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors text-mango active:scale-95"><Plus size={18}/></button>
                           </div>
                        </div>
                      </div>

                      {/* Bundle Activation Feedback */}
                      <AnimatePresence>
                        {totalUnits > 1 && totalUnits % 2 === 0 && (
                          <motion.div
                            key="bundle-active"
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="relative mt-4 bg-jungle/10 border border-jungle/20 text-jungle text-[11px] uppercase font-bold tracking-[0.15em] text-center py-3 rounded-xl"
                          >
                            🔥 Bundle activado — mejor precio por unidad
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Dynamic Upsell Message */}
                      <AnimatePresence>
                        {totalUnits > 0 && totalUnits % 2 === 1 && (
                          <motion.div
                            key="upsell-msg"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 0.85, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="mt-4 text-center text-[13px] text-mango font-bold tracking-wide"
                          >
                            {totalUnits === 1 ? "💡 Lleva 2 y desbloquea precio bundle" : "💡 Agrega 1 más y optimiza el precio total"}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* SECTION C - Pricing Summary */}
                      <div className="mt-6 p-5 md:p-6 rounded-2xl bg-[#0F0F0F] border border-white/5 flex flex-col items-center md:items-start text-center md:text-left">
                         <span className="block text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-4">Total Estimado</span>
                         
                         {totalUnits > 0 ? (
                            <div className="w-full">
                               <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                                  <div>
                                     <p className="text-xl text-cream font-bold">{totalUnits} productos</p>
                                     <p className="text-sm text-white/50">{bundlePairs} bundle(s) + {remainingSingles} unidad(es) regular(es)</p>
                                  </div>
                                  <div className="text-3xl font-display text-cream tracking-tighter mt-2 md:mt-0">
                                     ₡{totalCRC.toLocaleString()} <span className="text-white/30 text-2xl mx-1">(${totalUSD})</span>
                                  </div>
                               </div>

                               <hr className="border-white/10 my-4" />

                               <div className="space-y-3">
                                  {savingsCRC > 0 && (
                                     <div>
                                        <p className="text-jungle font-bold text-sm bg-jungle/10 px-3 py-1.5 rounded-md inline-block">
                                           🔥 Estás ahorrando ₡{savingsCRC.toLocaleString()} (${savingsUSD.toLocaleString()})
                                        </p>
                                     </div>
                                  )}
                                  {totalUnits > 1 && (
                                     <p className="text-white/40 text-xs font-medium">Precio promedio por unidad: ₡{avgCRC.toLocaleString()}</p>
                                  )}
                               </div>
                            </div>
                         ) : (
                            <div className="w-full text-center py-4">
                               <p className="text-lg text-white/20 italic font-serif">Selecciona al menos un producto para ver el total</p>
                            </div>
                         )}
                      </div>
                      
                      {/* Dynamic validation error */}
                      {errorMsg && (
                        <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-flame text-xs font-bold uppercase tracking-widest mt-4 text-center">
                          {errorMsg}
                        </motion.p>
                      )}
                    </section>

                    {/* SECTION A - Customer Information */}
                    <section>
                      <h3 className="text-lg font-display uppercase text-mango border-b border-white/10 pb-2 mb-6">2. Tus Datos</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>Nombre Completo</label>
                            <input name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Ej: Maria Perez" className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>Email</label>
                            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="ejemplo@email.com" className={inputClass} />
                          </div>
                        </div>
                        <div>
                           <label className={labelClass}>Teléfono / WhatsApp</label>
                           <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="Para coordinar tu entrega" className={inputClass} />
                        </div>
                      </div>
                    </section>

                    {/* SECTION D & E - Delivery Logic */}
                    <section>
                      <h3 className="text-lg font-display uppercase text-mango border-b border-white/10 pb-2 mb-6 flex items-center justify-between">
                         3. Logística
                         <span className="text-[10px] uppercase font-sans text-white/40 font-bold tracking-wider">Costa Rica</span>
                      </h3>
                      <p className="text-xs text-white/50 mb-4 font-medium leading-relaxed">
                        Esta información nos ayuda a pre-calcular el costo de envío con proveedores logísticos (Moovin, Correos) o sugerirte un punto de recolección.
                      </p>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <input name="province" type="text" value={form.province} onChange={handleChange} required placeholder="Provincia" className={inputClass} />
                           <input name="canton" type="text" value={form.canton} onChange={handleChange} required placeholder="Cantón" className={inputClass} />
                           <input name="district" type="text" value={form.district} onChange={handleChange} required placeholder="Distrito" className={inputClass} />
                        </div>
                        <textarea name="address" value={form.address} onChange={handleChange} required rows={2} placeholder="Dirección exacta, señas o punto de referencia..." className={`${inputClass} resize-none`} />
                        
                        <div>
                           <label className={labelClass}>Método Preferido preliminar</label>
                           <select name="deliveryMethod" value={form.deliveryMethod} onChange={handleChange} required className={`${inputClass} cursor-pointer`}>
                              <option value="home" className="bg-[#1A1A1A] text-white">Envío a Domicilio</option>
                              <option value="pickup" className="bg-[#1A1A1A] text-white">Recoger / Punto de Retiro (Tamarindo)</option>
                              <option value="whatsapp" className="bg-[#1A1A1A] text-white">Coordinar con ventas por WhatsApp</option>
                           </select>
                        </div>
                      </div>
                    </section>

                    {/* SECTION F - Notes */}
                    <section>
                       <h3 className="text-lg font-display uppercase text-mango border-b border-white/10 pb-2 mb-6">4. Notas (Opcional)</h3>
                       <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Instrucciones especiales, dudas, etc." className={`${inputClass} resize-none`} />
                    </section>

                    {/* SECTION G & H - Disclaimer and Submit */}
                    <section className="pt-6 border-t border-white/10">
                       <p className="text-[11px] text-white/60 font-medium tracking-wide text-center mb-4">
                         Sin pago en línea. Confirmamos contigo directamente.
                       </p>

                       <button
                         type="submit"
                         disabled={formState === 'loading' || totalUnits === 0}
                         className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl transition-all duration-300 ${totalUnits === 0 ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-[#C7432A] text-white hover:bg-white hover:text-[#C7432A] active:scale-[0.98]'}`}
                       >
                         {formState === 'loading' ? (
                           <>
                             <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                             </svg>
                             Procesando...
                           </>
                         ) : (
                           `Solicitar Pedido (${totalUnits} items)`
                         )}
                       </button>
                    </section>
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
