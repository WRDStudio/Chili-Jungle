import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateRecipePairing } from '../services/geminiService';
import { RecipeSuggestion } from '../types';
import { useRitual } from '../contexts/RitualContext';

export const ChefJungleAI: React.FC = () => {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState<RecipeSuggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const { theme, mode } = useRitual();

  const handlePair = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await generateRecipePairing(input, mode);
      setSuggestion(res);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <section className={`py-12 md:py-24 px-4 ${theme.bg} border-t ${theme.border}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className={`text-4xl md:text-7xl font-display uppercase mb-6 tracking-tighter ${theme.text}`}>
          TU TOQUE MAESTRO
        </h2>
        <p className={`text-xl md:text-3xl font-serif italic opacity-90 mb-8 md:mb-12 max-w-2xl mx-auto ${theme.text}`}>
          "¿Listo para llevar tu plato al siguiente nivel? Escribe lo que vas a comer y deja que el Chili Jungle Chef te diseñe el ritual perfecto."
        </p>
        <div className="flex gap-2 md:gap-4 mb-8 md:mb-12">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="ej. Pizza, Aguacate..."
            className={`flex-1 bg-transparent border-b-2 border-current py-2 text-base md:text-xl focus:outline-none placeholder-neutral-400 ${theme.text}`}
          />
          <button onClick={handlePair} className={`px-4 md:px-8 py-2 ${theme.button} ${theme.buttonText} font-bold rounded uppercase text-[10px] md:text-xs tracking-widest whitespace-nowrap`}>
            {loading ? <Loader2 className="animate-spin" /> : 'Pair it'}
          </button>
        </div>
        {suggestion && (
          <div className={`p-8 border-2 border-current rounded-3xl animate-fade-in text-left ${theme.text}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-display font-bold uppercase">{suggestion.title}</h3>
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                suggestion.recommendedProduct === 'tropical' ? 'bg-[#CDFF00] text-black' : 'bg-[#E31D24] text-white'
              }`}>
                USAR CON: {suggestion.recommendedProduct}
              </span>
            </div>
            <p className="font-serif italic text-lg mb-6 opacity-80">"{suggestion.description}"</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {suggestion.ingredients.map((ing, i) => (
                <span key={i} className="px-3 py-1 border border-current rounded-full text-[10px] font-bold uppercase">{ing}</span>
              ))}
            </div>
            {suggestion.steps && suggestion.steps.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-60">Instrucciones / Steps</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm md:text-base opacity-90">
                  {suggestion.steps.map((step, i) => (
                    <li key={i} className="pl-2">{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};