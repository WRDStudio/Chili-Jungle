import React, { useState } from 'react';
import { Sparkles, Loader2, ChefHat } from 'lucide-react';
import { generateRecipePairing } from '../services/geminiService';
import { RecipeSuggestion } from '../types';
import { useRitual } from '../contexts/RitualContext';

export const ChefJungleAI: React.FC = () => {
  const [foodInput, setFoodInput] = useState('');
  const [suggestion, setSuggestion] = useState<RecipeSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { theme, mode } = useRitual();

  const handleGenerate = async () => {
    if (!foodInput.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const result = await generateRecipePairing(foodInput, mode);
      setSuggestion(result);
    } catch (err) {
      setError("Chef is on a break. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={`py-24 px-4 transition-colors duration-500 ${theme.bg} border-t ${theme.border}`}>
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-12">
           <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full border ${theme.border} mb-4`}>
             <Sparkles size={14} className={theme.accent} />
             <span className={`text-xs font-bold uppercase tracking-widest ${theme.text}`}>AI Pairing Assistant</span>
           </div>
           <h2 className={`text-4xl md:text-5xl font-display font-bold uppercase ${theme.text}`}>
             ¿Qué vas a comer?
           </h2>
           <p className={`mt-4 font-serif italic ${theme.text} opacity-70`}>
             Dinos tu plato, y el Chef Jungle te dirá cómo elevarlo.
           </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 mb-12">
            <input 
              type="text"
              value={foodInput}
              onChange={(e) => setFoodInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="ej. Pizza fría, Aguacate, Helado de vainilla..."
              className={`flex-1 bg-transparent border-b-2 ${theme.border} ${theme.text} py-4 text-xl focus:outline-none focus:border-current placeholder-gray-500`}
            />
            <button 
              onClick={handleGenerate}
              disabled={isLoading || !foodInput}
              className={`px-6 ${theme.button} ${theme.buttonText} font-bold uppercase tracking-wider rounded disabled:opacity-50`}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Pair It'}
            </button>
          </div>

          {suggestion && (
            <div className={`p-8 border ${theme.border} rounded-xl relative overflow-hidden animate-fade-in`}>
               <div className={`absolute top-0 left-0 w-1 h-full ${mode === 'classic' ? 'bg-red-600' : mode === 'tropical' ? 'bg-tropical-teal' : 'bg-luxe-gold'}`}></div>
               <h3 className={`text-2xl font-display font-bold uppercase mb-2 ${theme.text}`}>{suggestion.title}</h3>
               <p className={`font-serif text-lg italic mb-6 ${theme.text} opacity-80`}>"{suggestion.description}"</p>
               
               <div className="flex flex-wrap gap-2">
                 {suggestion.ingredients.map((ing, i) => (
                   <span key={i} className={`text-xs font-bold uppercase px-2 py-1 border ${theme.border} rounded ${theme.text} opacity-70`}>
                     {ing}
                   </span>
                 ))}
               </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};