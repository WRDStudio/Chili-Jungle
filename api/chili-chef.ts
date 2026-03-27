import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

// Google Gemini API handler using @google/genai (NextGen SDK) v1.30.0

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const lang = req.body?.lang || 'es';

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { foodItem, ritualMode } = req.body;
    
    // Environment check inside handler
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('[ChefAPI] CRITICAL: GEMINI_API_KEY is missing.');
      return res.status(500).json({ error: 'API key not configured in Vercel.' });
    }

    // Initialize inside handler to catch setup errors
    let genAI;
    try {
      genAI = new GoogleGenAI({ apiKey });
    } catch (e: any) {
      console.error('[ChefAPI] Initialization Error:', e);
      return res.status(500).json({ error: 'Failed to initialize AI client: ' + e.message });
    }

    // Basic validation
    if (!foodItem || typeof foodItem !== 'string') {
      return res.status(400).json({ 
        error: lang === 'es' ? 'Debes ingresar un alimento / ingrediente real.' : 'Please provide a real food ingredient or dish name.' 
      });
    }

    const validRitualModes = ['luxe', 'classic', 'tropical'];
    if (!ritualMode || !validRitualModes.includes(ritualMode)) {
      return res.status(400).json({ error: 'Invalid ritual mode.' });
    }

    // System prompt and context
    const systemInstruction = `You are the Chili Jungle Chef, an expert in pairing real food with Chili Jungle hot sauces.
    Chili Jungle has two physical products:
    1. Chili Jungle Clásico: Traditional, versatile, balanced heat.
    2. Chili Jungle Tropical: Exotic, fruity, vibrant heat.
    
    Users also choose a 'Ritual Mode' (Mood):
    - Luxe: Sophisticated, elevated, premium experience.
    - Clásico: Authentic, traditional, everyday greatness.
    - Tropical: Fun, exotic, adventurous vibe.
    
    CRITICAL: Luxe is NOT a product. If a user chooses Luxe mode, you MUST still recommend either 'clasico' or 'tropical' as the actual physical product based on the food provided.
    
    VALIDATION:
    - If the input is not a real food ingredient or dish (e.g., vulgar, absurd, non-food, or joke), return a valid JSON object with "error": "NOT_FOOD".
    - Otherwise, provide a creative recipe or serving suggestion that includes the food item and ONE of the Chili Jungle products.
    - Language: ${lang === 'es' ? 'Spanish' : 'English'}.`;

    const promptText = `User food input: "${foodItem}"
    User ritual mode: "${ritualMode}"
    
    Provide a pairing suggestion in JSON format with exactly these fields:
    {
      "title": "Creative name for the pairing",
      "description": "Short description of the experience",
      "ingredients": ["Ingredient 1", "Ingredient 2", ...],
      "steps": ["Step 1...", "Step 2..."],
      "recommendedProduct": "clasico" or "tropical"
    }`;

    console.log('[ChefAPI] Generating content for:', foodItem);

    // Use models.generateContent with standard naming
    const result = await genAI.models.generateContent({
      model: 'models/gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: promptText }] }],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            steps: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendedProduct: { 
              type: Type.STRING,
              enum: ['clasico', 'tropical']
            },
            error: { type: Type.STRING }
          },
          required: ['title', 'description', 'ingredients', 'steps', 'recommendedProduct']
        }
      }
    });

    if (result && result.text) {
      const data = JSON.parse(result.text);
      if (data.error === 'NOT_FOOD') {
        return res.status(400).json({ 
          error: lang === 'es' ? 'El Chef solo acepta alimentos reales.' : 'The Chef only works with real food!' 
        });
      }
      return res.status(200).json(data);
    } else {
      console.error('[ChefAPI] Empty result from AI');
      return res.status(500).json({ error: 'El Chef no pudo generar una respuesta. Intenta de nuevo.' });
    }

  } catch (error: any) {
    console.error('[ChefAPI] Execution Error:', error);
    const msg = error.message || '';
    
    // Check for specific API errors
    if (msg.includes('403') || msg.includes('API_KEY')) {
      return res.status(500).json({ error: 'Configuración de API inválida. Revisa Vercel.' });
    }
    
    return res.status(500).json({ 
      error: lang === 'es' ? 'Error interno del Chef. Intenta de nuevo.' : 'Internal Chef error. Please try again.',
      debug: process.env.NODE_ENV === 'development' ? msg : undefined
    });
  }
}
