import { GoogleGenAI, Type } from "@google/genai";
import { RecipeSuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRecipePairing = async (foodItem: string, ritualMode: string): Promise<RecipeSuggestion | null> => {
  try {
    const model = "gemini-2.5-flash";
    
    let vibe = "";
    if (ritualMode === 'luxe') vibe = "sophisticated, fine-dining, late-night bar vibe";
    else if (ritualMode === 'tropical') vibe = "fresh, beachy, tamarindo surf vibe, heavy on citrus and freshness";
    else vibe = "classic spicy, energetic, street food and pizza vibe";

    const prompt = `
      I have a premium chili oil brand called "Chili Jungle Studio" based in Tamarindo, Costa Rica.
      We have a "Ritual" concept: Luxe (Elegant), Classic (Spicy/Street), Tropical (Fresh).
      Current Ritual Mode: ${ritualMode}.
      
      The user wants to pair "Chili Jungle" oil with: "${foodItem}".
      Suggest a creative mini-recipe or serving suggestion.
      
      Tone: ${vibe}. Keep it cool, like a DJ recommending a track, but for food.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are the head chef of 'Chili Jungle Studio'. You speak with passion, blending culinary expertise with a laid-back Costa Rican surfer/musician vibe.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy name for the dish (e.g. 'Midnight Mango Toast')" },
            description: { type: Type.STRING, description: "2-3 sentences on how to assemble it." },
            ingredients: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3-4 key ingredients."
            }
          },
          required: ["title", "description", "ingredients"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as RecipeSuggestion;
    }
    return null;

  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};