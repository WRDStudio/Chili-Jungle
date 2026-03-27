import React, { useState, useEffect } from 'react';
import { useRitual } from '../contexts/RitualContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const RaizDelFuego: React.FC = () => {
  const { theme } = useRitual();
  const [currentIndex, setCurrentIndex] = useState(0);

  const ingredients = [
    {
      emoji: "🌶️",
      name: "La Mezcla Salvaje",
      img: "/images/ingredientes-mezcla.png",
      emotional: "Donde todo comienza.",
      desc: "La armonía entre fuego, frescura y profundidad.",
      benefit: "Equilibra sabores complejos y crea una experiencia completa en cada gota."
    },
    {
      emoji: "🔥",
      name: "Carolina Reaper",
      img: "/images/ingredientes-reaper.png",
      emotional: "El corazón del fuego.",
      desc: "Intensidad extrema con carácter profundo.",
      benefit: "Estimula el metabolismo y libera endorfinas naturales."
    },
    {
      emoji: "🌶️",
      name: "Chiles Secos",
      img: "/images/ingredientes-chiles.png",
      emotional: "La herencia del calor.",
      desc: "Tostados lentamente para revelar dulzura y profundidad.",
      benefit: "Aportan antioxidantes y un perfil de sabor complejo."
    },
    {
      emoji: "🧄",
      name: "Ajo Fresco",
      img: "/images/ingredientes-ajo.png",
      emotional: "La base esencial.",
      desc: "Terrenal, potente y profundamente aromático.",
      benefit: "Propiedades antibacterianas y apoyo al sistema inmune."
    },
    {
      emoji: "🌱",
      name: "Jengibre",
      img: "/images/ingredientes-jengibre.png",
      emotional: "El filo fresco.",
      desc: "Picante limpio con notas cítricas vibrantes.",
      benefit: "Favorece la digestión y reduce la inflamación."
    },
    {
      emoji: "🌾",
      name: "Sésamo",
      img: "/images/ingredientes-sesamo.png",
      emotional: "El detalle tostado.",
      desc: "Aroma cálido y textura persistente.",
      benefit: "Rico en grasas saludables y minerales esenciales."
    },
    {
      emoji: "🧂",
      name: "Sal Marina",
      img: "/images/ingredientes-sal.png",
      emotional: "El equilibrio perfecto.",
      desc: "Realza cada capa de sabor.",
      benefit: "Aporta minerales naturales y mejora la absorción."
    },
    {
      emoji: "🌿",
      name: "Especias Aromáticas",
      img: "/images/ingredientes-especias.png",
      emotional: "El secreto profundo.",
      desc: "Anís estrella, canela y capas ocultas de sabor.",
      benefit: "Propiedades antioxidantes y digestivas."
    },
    {
      emoji: "🛢️",
      name: "Aceite Infusionado",
      img: "/images/ingredientes-aceite.png",
      emotional: "El vehículo del sabor.",
      desc: "Lento, preciso, lleno de carácter.",
      benefit: "Transporta y potencia cada ingrediente."
    },
    {
      emoji: "🌿",
      name: "Tropical Blend",
      img: "/images/ingredientes-cilantro.jpg",
      emotional: <>El alma fresca de la selva <strong className="font-bold opacity-100">(incluidos solo en el producto Tropical)</strong>.</>,
      desc: "Verde, brillante y vibrante.",
      benefit: "Aporta frescura y equilibrio al picante."
    }
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % ingredients.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + ingredients.length) % ingredients.length);

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ingredients.length);
    }, 8000); // 8 seconds per slide to allow reading
    return () => clearInterval(timer);
  }, []);

  const currentItem = ingredients[currentIndex];

  return (
    <section className={`py-24 md:py-32 ${theme.bg} transition-colors duration-700 overflow-hidden relative`}>
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className={`block uppercase tracking-[0.3em] text-[10px] md:text-sm font-bold opacity-70 mb-4 ${theme.text}`}>Orígenes</span>
          <h2 className={`text-4xl md:text-7xl lg:text-8xl font-display uppercase tracking-tighter ${theme.text}`}>
            Raíz del Fuego
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center">
          
          {/* Controls */}
          <button 
            onClick={prevSlide}
            className={`absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full backdrop-blur-md bg-black/5 hover:bg-black/10 border border-current/10 transition-all ${theme.text}`}
          >
            <ChevronLeft size={24} className="md:w-8 md:h-8" />
          </button>
          
          <button 
            onClick={nextSlide}
            className={`absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full backdrop-blur-md bg-black/5 hover:bg-black/10 border border-current/10 transition-all ${theme.text}`}
          >
            <ChevronRight size={24} className="md:w-8 md:h-8" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex} 
              className={`w-full max-w-5xl mx-auto flex flex-col ${currentIndex % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 px-6 md:px-0`}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-2xl relative flex justify-center items-center bg-transparent">
                <img 
                  src={currentItem.img} 
                  alt={currentItem.name} 
                  className="w-full h-auto max-h-[70vh] object-contain transition-transform duration-[2000ms] hover:scale-105" 
                />
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col justify-center mt-6 md:mt-0 perspective-1000">
                <div 
                  className={`group relative w-full max-w-md mx-auto md:mx-0 py-8 cursor-pointer transition-all duration-[600ms] ${currentIndex % 2 === 0 ? 'md:mr-auto text-center md:text-left' : 'md:ml-auto text-center md:text-right'}`}
                  tabIndex={0}
                >
                  <div className={`flex flex-col mb-4 ${currentIndex % 2 === 0 ? 'justify-center md:items-start' : 'justify-center md:items-end'}`}>
                    <div className={`flex items-center gap-2 mb-4 opacity-50 group-hover:opacity-0 transition-opacity duration-500 justify-center ${currentIndex % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                      <div className="relative flex h-2 w-2 text-[#C7432A]">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-100"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                      </div>
                      <span className={`text-[9px] uppercase tracking-[0.3em] font-bold ${theme.text}`}>Descubrir</span>
                    </div>
                    <h3 className={`text-5xl sm:text-6xl lg:text-7xl font-display uppercase tracking-tighter leading-[0.9] ${theme.text}`}>
                      {currentItem.name}
                    </h3>
                  </div>
                  
                  <p className={`font-serif italic text-xl md:text-2xl leading-relaxed opacity-90 ${theme.text}`}>
                    "{currentItem.emotional}"
                  </p>

                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr] transition-[grid-template-rows] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <div className="overflow-hidden">
                      <div className="pt-6 mt-6 border-t border-current/20 flex flex-col gap-5 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-[600ms] delay-100">
                        <p className={`font-medium text-lg leading-snug opacity-95 ${theme.text}`}>
                          {currentItem.desc}
                        </p>
                        <div className="pt-2">
                          <span className={`block text-xs uppercase tracking-widest font-bold mb-2 opacity-50 ${theme.text}`}>
                            Beneficio Funcional
                          </span>
                          <p className={`text-sm md:text-base font-bold leading-snug ${theme.text}`}>
                            {currentItem.benefit}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-12 md:mt-16">
          {ingredients.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-current scale-125' : 'bg-current opacity-30 hover:opacity-60'} ${theme.text}`}
              aria-label={`Ir a diapositiva ${idx + 1}`}
            />
          ))}
        </div>

        {/* Section Closing */}
        <motion.div 
          className="text-center mt-24 md:mt-32 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-[1px] bg-current/20 mx-auto mb-12"></div>
          <p className={`font-display uppercase tracking-widest text-2xl md:text-4xl leading-snug opacity-90 ${theme.text}`}>
            "Cada ingrediente tiene un propósito.<br className="hidden md:block"/> Juntos, crean el ritual."
          </p>
        </motion.div>

      </div>
    </section>
  );
};
