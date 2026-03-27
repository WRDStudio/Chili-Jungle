import React, { useState, useEffect } from 'react';
import { useRitual } from '../contexts/RitualContext';
import { ArrowRight, X, Clock, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Recipe = {
    title: string;
    description: string;
    image: string;
    ingredients: string[];
    steps: string[];
    suggestedVariant: string;
    className?: string;
};

const recipes: Recipe[] = [
    {
        title: "Tacos al Pastor",
        description: "SPICY. FRESH. SALVAJE.",
        image: "/images/TacosCJ.png",
        ingredients: [
            "Tortillas de maíz recién echadas",
            "Carne al pastor marinada",
            "Piña asada picada",
            "Cilantro y cebolla fresca",
            "Chili Jungle (Al gusto)"
        ],
        steps: [
            "Calienta las tortillas en el comal hasta que estén suaves.",
            "Sirve la carne al pastor caliente directamente del trompo (o sartén).",
            "Añade la piña, cebolla y cilantro finamente picados.",
            "Corónalo todo con unas gotas de Chili Jungle para despertar el sabor."
        ],
        suggestedVariant: "Tropical"
    },
    {
        title: "Dumplings Caldosos",
        description: "SPICY. TENDER. SALVAJE.",
        image: "/images/DumplingsCJ.png",
        ingredients: [
            "Dumplings de cerdo o vegetales",
            "Salsa de soya baja en sodio",
            "Aceite de sésamo tostado",
            "Cebolla cambray picada",
            "Chili Jungle"
        ],
        steps: [
            "Hierve o cocina al vapor los dumplings según las instrucciones.",
            "Prepara una mezcla con la salsa de soya, aceite de sésamo y un toque de agua.",
            "Sirve los dumplings calientes y báñalos con la mezcla preparada.",
            "Añade cebolla cambray y el Chili Jungle para el fuego aromático definitivo."
        ],
        suggestedVariant: "Clásico"
    },
    {
        title: "Alitas Salvajes",
        description: "SPICY. CRUNCHY. SALVAJE.",
        image: "/images/WingsCJ.png",
        ingredients: [
            "Alitas de pollo limpias y secas",
            "Harina sazonada con ajo y sal",
            "Aceite vegetal para freír",
            "Chili Jungle",
            "Miel de abeja (Opcional)"
        ],
        steps: [
            "Seca bien las alitas y cúbrelas con una capa ligera de harina sazonada.",
            "Fríelas o hornéalas hasta que estén doradas y extremadamente crujientes.",
            "En un bowl grande, mezcla Chili Jungle con un poco de miel si deseas un toque agridulce.",
            "Tira las alitas calientes en la mezcla hasta que estén completamente bañadas."
        ],
        suggestedVariant: "Tropical"
    },
    {
        title: "Helado de Vainilla",
        description: "SPICY. SWEET. SALVAJE.",
        image: "/images/VainillaCJ.png",
        ingredients: [
            "Helado de vainilla de alta calidad",
            "Chili Jungle",
            "Sal marina en hojuelas",
            "Frutos rojos frescos (Opcional)"
        ],
        steps: [
            "Sirve una bola generosa de helado de vainilla en un tazón frío.",
            "Deja caer estratégicamente unas gotas de Chili Jungle sobre el helado.",
            "Espolvorea una pizca de sal marina para contrastar la dulzura.",
            "Disfruta la fusión instantánea de frío extremo, aceite picante y dulzura láctea."
        ],
        suggestedVariant: "Clásico"
    }
];

export const Recipes = () => {
    const { theme } = useRitual();
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedRecipe) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [selectedRecipe]);

    return (
        <section className={`py-32 px-4 transition-colors duration-700 ${theme.bg}`}>
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className={`block uppercase tracking-[0.3em] text-sm font-bold opacity-70 mb-4 ${theme.text}`}>Inspiración</span>
                    <h2 className={`text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-tighter ${theme.text}`}>
                        Recetas de la Selva
                    </h2>
                </motion.div>

                {/* Recipe Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {recipes.map((recipe, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => setSelectedRecipe(recipe)}
                            className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 bg-black"
                        >
                            {/* Background Image */}
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100`}
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <h3 className="text-3xl font-bold text-white mb-2 font-display uppercase tracking-wide leading-none">{recipe.title}</h3>
                                
                                <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100">
                                    <p className="text-white/80 text-sm mb-6 mt-4 font-serif italic">
                                        "{recipe.description}"
                                    </p>
                                </div>
                                
                                <span className="inline-flex items-center text-flame font-bold text-xs uppercase tracking-widest mt-4 group-hover:text-mango transition-colors">
                                    Ver Receta Completa <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Premium Modal */}
            <AnimatePresence>
                {selectedRecipe && (
                    <motion.div 
                        key="recipe-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" 
                        aria-modal="true" role="dialog"
                    >
                        {/* Backdrop */}
                        <div 
                            onClick={() => setSelectedRecipe(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />

                        {/* Modal Content */}
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-5xl bg-[#1A1A1A] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh] z-10"
                        >
                            {/* Close Button */}
                            <button 
                                onClick={() => setSelectedRecipe(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-white/20 text-cream rounded-full transition-colors backdrop-blur-md"
                            >
                                <X size={24} />
                            </button>

                            {/* Left: Image Hero */}
                            <div className="w-full lg:w-2/5 h-64 lg:h-auto relative bg-black shrink-0">
                                <img 
                                    src={selectedRecipe.image} 
                                    alt={selectedRecipe.title} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
                                <h3 className="lg:hidden absolute bottom-6 left-6 text-4xl font-display uppercase tracking-tighter text-white">
                                    {selectedRecipe.title}
                                </h3>
                            </div>

                            {/* Right: Recipe Details */}
                            <div className="w-full lg:w-3/5 p-8 md:p-12 overflow-y-auto">
                                <h3 className="hidden lg:block text-5xl font-display uppercase tracking-tighter text-cream mb-8">
                                    {selectedRecipe.title}
                                </h3>

                                <div className="flex flex-col md:flex-row gap-12">
                                    {/* Ingredients & Variant */}
                                    <div className="md:w-1/3 shrink-0">
                                        <div className="mb-8">
                                            <h4 className="text-xs uppercase tracking-widest font-bold text-flame mb-4">Salsa Sugerida</h4>
                                            <div className="flex items-center gap-2 text-cream font-medium bg-white/5 p-3 rounded-xl border border-white/10">
                                                <Flame size={18} className="text-flame" />
                                                {selectedRecipe.suggestedVariant}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-xs uppercase tracking-widest font-bold text-flame mb-4">Ingredientes</h4>
                                            <ul className="space-y-3">
                                                {selectedRecipe.ingredients.map((ing, i) => (
                                                    <li key={i} className="text-sm text-cream/80 flex items-start">
                                                        <span className="text-mango mr-2 font-bold">•</span>
                                                        {ing}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Steps & CTA */}
                                    <div className="md:w-2/3 flex flex-col">
                                        <h4 className="text-xs uppercase tracking-widest font-bold text-flame mb-4">El Ritual (Preparación)</h4>
                                        <div className="space-y-6 flex-grow">
                                            {selectedRecipe.steps.map((step, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <span className="text-3xl font-display text-cream/20 leading-none">{i + 1}</span>
                                                    <p className="text-cream/90 text-sm md:text-base leading-relaxed pt-1">
                                                        {step}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-12 pt-8 border-t border-black/10">
                                            <a 
                                                href="#products" 
                                                onClick={() => setSelectedRecipe(null)}
                                                className="block w-full text-center px-8 py-4 bg-jungle text-white rounded-xl font-bold uppercase tracking-widest hover:bg-black transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                            >
                                                Ordenar Ahora
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
