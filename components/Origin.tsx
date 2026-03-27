import React, { useState, useEffect } from 'react';
import { useRitual } from '../contexts/RitualContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const Origin: React.FC = () => {
  const { theme } = useRitual();
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const galleryImages = [
    '/images/gallery_1.jpg',
    '/images/gallery_2.png',
    '/images/gallery_3.jpg',
    '/images/gallery_4.jpg',
    '/images/gallery_5.png',
    '/images/gallery_6.jpg',
    '/images/gallery_7.jpg',
    '/images/gallery_8.jpg'
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!showModal) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [showModal]);

  return (
    <section id="origin" className={`py-24 scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-36 ${theme.bg}`}>
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <img
          src="/images/Tamarindo_sunset_2025.jpg"
          alt="Sunset in Tamarindo"
          className="rounded-3xl shadow-2xl object-cover h-[400px] w-full hover:scale-[1.02] transition-transform duration-500"
        />
        <div>
          <h2 className={`text-5xl font-display uppercase mb-6 tracking-tighter ${theme.text}`}>Nacimos en Tamarindo</h2>
          <p className={`font-serif text-lg leading-relaxed opacity-80 mb-6 ${theme.text}`}>
            Hecho a mano en pequeños lotes, sin conservantes ni aditivos.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className={`px-8 py-3 border-2 font-bold uppercase text-xs tracking-widest transition-colors ${theme.border} ${theme.text} hover:scale-105`}
          >
            Ver Historia
          </button>
        </div>
      </div>

      {/* Modal Overlay - Luxe Palette Force */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[90vh]">

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Left: Creative Carousel */}
            <div className="w-full md:w-1/2 relative h-[300px] md:h-auto bg-black overflow-hidden group">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60" />
                </div>
              ))}

              {/* Carousel Controls */}
              <button
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full hover:bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full hover:bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
              >
                <ChevronRight size={24} />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Content - Luxe Style */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-[#1a1a1a] text-[#F3E5AB]">
              <div className="flex flex-col gap-6">
                <div className="border-b border-white/10 pb-6">
                  <span className="text-xs font-bold tracking-[0.3em] text-[#C7432A] uppercase mb-2 block">Nuestra Historia</span>
                  <h3 className="text-4xl md:text-5xl font-display uppercase tracking-wide bg-gradient-to-r from-[#F3E5AB] via-[#FFD700] to-[#E5812A] text-transparent bg-clip-text drop-shadow-sm leading-tight">
                    SPICY. TROPICAL.<br />SALVAJE.
                  </h3>
                </div>

                <div className="space-y-6 font-serif opacity-90 leading-relaxed font-light text-lg">
                  <p>
                    <span className="font-bold text-white">Chili Jungle</span> nace en Tamarindo, Costa Rica, en el corazón de la selva tropical y a pasos del mar, como una expresión auténtica del fuego natural que habita en la cocina centroamericana. No es solo un producto; es una experiencia sensorial que mezcla ingredientes frescos, naturaleza y un espíritu salvaje.
                  </p>
                  <p>
                    Inspirado por sabores orientales y técnicas artesanales, Chili Jungle fue creado por un emprendedor amante de la cocina que entendió que el fuego también puede ser elegante. Cada frasco es un homenaje al equilibrio entre lo exótico, lo saludable y lo picante e irresistible.
                  </p>
                  <p className="border-l-2 border-[#C7432A] pl-6 italic text-white/80">
                    "Todo infusionado en aceite vegetal de alta calidad, siguiendo un proceso lento y cuidadoso que libera todo el carácter de cada ingrediente."
                  </p>
                </div>

                <div className="pt-6 mt-auto">
                  <img
                    src="/images/logo_vector.svg"
                    alt="Chili Jungle"
                    className="w-32 opacity-90 transition-all duration-1000 animate-pulse hover:scale-110 drop-shadow-[0_0_15px_rgba(243,229,171,0.2)] hover:drop-shadow-[0_0_30px_rgba(243,229,171,0.5)]"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};