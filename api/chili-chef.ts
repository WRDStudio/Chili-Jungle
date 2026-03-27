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

    const prompt = `Pair Chili Jungle (${ritualMode}) with: "${foodItem}". 
    Vibe: ${vibe}. Produce a high-end serving suggestion or mini-recipe. 
    Language: ${lang === 'es' ? 'Spanish' : 'English'}.`;

    const result = await genAI.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: `You are the Executive Chef of 'Chili Jungle', a premium chili oil brand from Tamarindo, Costa Rica.
        Your tone is premium, modern, flavorful, and concise. You sound like a sophisticated chef who is also a local surfer/musician.
        
        RULES:
        1. ONLY accept real food ingredients or real dish names.
        2. REJECT vulgar, absurd, non-food, or joke inputs (e.g., "car tires", "dirty socks"). 
        3. If the input is invalid, return a JSON with title: "Ritual No Disponible", description: "Lo siento, solo cocino con ingredientes reales y buenas vibras.", ingredients: [], steps: [].
        4. Suggest a creative pairing using the selected Chili Jungle Ritual mode: ${ritualMode}.
        5. Response must be valid JSON matching the schema precisely.`,
        responseMimeType: "application/json",
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
            }
          },
          required: ["title", "description", "ingredients", "steps"]
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
