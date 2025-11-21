import React, { useState } from 'react';
import { Sparkles, ChefHat, Loader2, UtensilsCrossed } from 'lucide-react';
import { generateRecipePairing } from '../services/geminiService';
import { RecipeSuggestion } from '../types';
import { useRitual } from '../contexts/RitualContext';

export const RecipeAI: React.FC = () => {
  const [foodInput, setFoodInput] = useState('');
  const [suggestion, setSuggestion] = useState<RecipeSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mode } = useRitual();

  const handleGenerate = async () => {
    if (!foodInput.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const result = await generateRecipePairing(foodInput, mode);
      setSuggestion(result);
    } catch (err) {
      setError("Our chef is a bit overwhelmed right now. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-chef" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text & Input */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full mb-6 border border-brand-100">
              <Sparkles size={18} />
              <span className="text-sm font-bold uppercase tracking-wide">Powered by Gemini AI</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Not sure what to eat?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Enter any food item—from vanilla ice cream to leftover pizza—and our AI Chef will generate the perfect spicy pairing using Inferno Drizzle.
            </p>

            <div className="bg-white shadow-xl rounded-2xl p-2 border border-gray-200 flex flex-col sm:flex-row gap-2">
              <input 
                type="text"
                value={foodInput}
                onChange={(e) => setFoodInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="e.g., Avocado Toast, Dumplings..."
                className="flex-1 px-6 py-4 text-lg text-gray-900 placeholder-gray-400 focus:outline-none rounded-xl bg-transparent"
              />
              <button 
                onClick={handleGenerate}
                disabled={isLoading || !foodInput}
                className="px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-brand-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Cooking...
                  </>
                ) : (
                  <>
                    <ChefHat size={20} /> Inspire Me
                  </>
                )}
              </button>
            </div>
            
            {error && (
              <p className="mt-4 text-red-500 text-sm">{error}</p>
            )}
          </div>

          {/* Right Column: Result Display */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            {suggestion ? (
              <div className="w-full bg-white rounded-3xl shadow-2xl border border-orange-100 p-8 md:p-10 animate-in zoom-in-95 duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-orange-100 rounded-full text-orange-600">
                    <UtensilsCrossed size={32} />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">AI Suggestion</span>
                </div>
                
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">{suggestion.title}</h3>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed italic">
                  "{suggestion.description}"
                </p>
                
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Key Ingredients</h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {suggestion.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center p-10 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 w-full">
                <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-4">
                  <ChefHat size={48} className="text-gray-300" />
                </div>
                <p className="text-gray-400 font-medium text-lg">
                  Waiting for your ingredient...
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};