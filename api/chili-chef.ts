import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { foodItem, ritualMode, lang = 'es' } = req.body;

  // 1. Validation
  if (!foodItem || typeof foodItem !== 'string') {
    return res.status(400).json({ error: 'Debes ingresar un alimento / Food item is required' });
  }

  const validModes = ['luxe', 'classic', 'tropical'];
  if (!validModes.includes(ritualMode)) {
    return res.status(400).json({ error: 'Ritual mode invalido' });
  }

  try {
    const model = "gemini-1.5-flash";
    
    let vibe = "";
    if (ritualMode === 'luxe') vibe = "sophisticated fine-dining, truffle-like elegance, late-night bar soul";
    else if (ritualMode === 'tropical') vibe = "citrus-forward, beachy, tamarindo surf freshness";
    else vibe = "bold street food, pizza, tacos, raw energy";

    const prompt = `Pair Chili Jungle Ritual (${ritualMode}) with: "${foodItem}". 
    Vibe: ${vibe}. Produce a high-end serving suggestion or mini-recipe. 
    Language: ${lang === 'es' ? 'Spanish' : 'English'}.`;

    const result = await genAI.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: `You are the Executive Chef of 'Chili Jungle'. 
        
        BRAND CONTEXT:
        - 3 Ritual Modes: Luxe (elegant), Clásico (bold), Tropical (fresh).
        - 2 Actual Products: 'Clásico' and 'Tropical'.
        - LUXE IS NOT A PRODUCT. It is a mood. 
        - Even if the ritual is 'Luxe', you MUST recommend one of the two physical products: 'clasico' or 'tropical'.
        
        RULES:
        1. ONLY accept real food ingredients or real dish names.
        2. REJECT vulgar, absurd, non-food, or joke inputs. In such cases, return title: "Ritual No Disponible", recommendedProduct: "clasico".
        3. Recommend exactly ONE physical product: 'clasico' or 'tropical' based on the dish compatibility.
        4. Response must be valid JSON in ${lang === 'es' ? 'Spanish' : 'English'}.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            recommendedProduct: { type: Type.STRING, enum: ['clasico', 'tropical'] },
            ingredients: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "description", "recommendedProduct", "ingredients", "steps"]
        }
      }
    });

    if (result.text) {
      return res.status(200).json(JSON.parse(result.text));
    }
    
    return res.status(500).json({ error: 'No response from chef' });

  } catch (error) {
    console.error('[ChefAPI] Error:', error);
    return res.status(500).json({ error: 'Error del Chef. Intenta de nuevo.' });
  }
}
