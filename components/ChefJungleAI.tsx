import React, { useState, useRef } from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { generateRecipePairing } from '../services/openaiService';
import { RecipeSuggestion } from '../types';
import { useRitual } from '../contexts/RitualContext';

interface CachedRequest {
  normalizedFoodItem: string;
  ritualMode: string;
  lang: string;
  result: RecipeSuggestion;
  timestamp: number;
}

const CACHE_WINDOW_MS = 60 * 1000; // 60 seconds

function normalize(str: string): string {
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
}

export const ChefJungleAI: React.FC = () => {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState<RecipeSuggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { theme, mode } = useRitual();
  
  const lastRequest = useRef<CachedRequest | null>(null);

  const handlePair = async () => {
    if (!input.trim() || loading) return;
    
    setErrorMsg('');
    const normalizedInput = normalize(input);
    const currentLang = 'es'; // Hardcoded for this context as backend defaults to 'es' currently

    // Check Frontend Deduplication Cache
    if (lastRequest.current) {
      const { normalizedFoodItem, ritualMode, lang, result, timestamp } = lastRequest.current;
      if (
        normalizedFoodItem === normalizedInput &&
        ritualMode === mode &&
        lang === currentLang &&
        (Date.now() - timestamp) < CACHE_WINDOW_MS
      ) {
        console.log('[Chef UI] FRONTEND_DEDUPE reused last response');
        setSuggestion(result);
        return;
      }
    }

    setLoading(true);
    setSuggestion(null);

    try {
      const res = await generateRecipePairing(input, mode);
      if (res) {
        setSuggestion(res);
        // Save to cache reference
        lastRequest.current = {
          normalizedFoodItem: normalizedInput,
          ritualMode: mode,
          lang: currentLang,
          result: res,
          timestamp: Date.now()
        };
      }
    } catch (e: any) { 
      console.error(e);
      setErrorMsg(e.message || 'Error del Chef. Por favor, intenta de nuevo.');
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <section className={`py-12 md:py-24 px-4 ${theme.bg} border-t ${theme.border}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className={`text-4xl md:text-7xl font-display uppercase mb-6 tracking-tighter ${theme.text}`}>
          TU TOQUE MAESTRO
        </h2>
        <p className={`text-lg md:text-2xl font-serif italic opacity-90 mb-4 max-w-xl mx-auto ${theme.text}`}>
          Tú describes el plato. Nosotros lo llevamos al paraíso.
        </p>
        <ol className={`text-sm md:text-base font-medium text-left max-w-sm mx-auto mb-8 md:mb-12 space-y-2 opacity-75 ${theme.text}`}>
          <li><span className="font-bold">1.</span> Escoge tu ritual — cada uno crea una experiencia distinta.</li>
          <li><span className="font-bold">2.</span> Escribe lo que vas a comer.</li>
          <li><span className="font-bold">3.</span> Recibe el pairing perfecto del Chili Jungle Chef al instante.</li>
        </ol>
        <p className={`text-xs uppercase tracking-[0.2em] font-bold opacity-40 mb-8 md:mb-12 ${theme.text}`}>
          From spicy lovers for spicy lovers
        </p>
        <div className="flex gap-2 md:gap-4 mb-8 md:mb-12">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
            onKeyDown={e => e.key === 'Enter' && handlePair()}
            placeholder="ej. Pizza, Aguacate..."
            className={`flex-1 bg-transparent border-b-2 border-current py-2 text-base md:text-xl focus:outline-none placeholder-neutral-400 disabled:opacity-50 transition-opacity ${theme.text}`}
          />
          <button 
            onClick={handlePair} 
            disabled={loading || !input.trim()}
            className={`px-4 md:px-8 py-2 ${theme.button} ${theme.buttonText} font-bold rounded uppercase text-[10px] md:text-xs tracking-widest whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
          >
            {loading ? <Loader2 className="animate-spin mx-auto w-4 h-4 md:w-5 md:h-5" /> : 'Pair it'}
          </button>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 justify-center text-red-500 mb-8 border border-red-500/30 bg-red-500/10 rounded-lg p-4 animate-fade-in mx-auto max-w-lg">
             <AlertCircle className="w-5 h-5 flex-shrink-0" />
             <p className="text-sm md:text-base font-medium text-left">{errorMsg}</p>
          </div>
        )}

        {suggestion && !errorMsg && (
          <div className={`p-8 border-2 border-current rounded-3xl animate-fade-in text-left ${theme.text}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-display font-bold uppercase">{suggestion.title}</h3>
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex-shrink-0 ml-4 ${
                suggestion.recommendedProduct === 'tropical' ? 'bg-[#CDFF00] text-black' : 'bg-[#E31D24] text-white'
              }`}>
                USAR CON: {suggestion.recommendedProduct}
              </span>
            </div>
            <p className="font-serif italic text-lg mb-6 opacity-80">"{suggestion.description}"</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {suggestion.ingredients?.map((ing, i) => (
                <span key={i} className="px-3 py-1 border border-current rounded-full text-[10px] font-bold uppercase">{ing}</span>
              ))}
            </div>
            {suggestion.steps && suggestion.steps.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-60">Instrucciones / Steps</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm md:text-base opacity-90">
                  {suggestion.steps?.map((step, i) => (
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