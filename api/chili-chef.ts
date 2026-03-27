import { VercelRequest, VercelResponse } from '@vercel/node';

// Chili Jungle Chef — Zero-Dependency Production API
// Uses direct REST call to Gemini to avoid SDK overhead and versioning issues

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Strict API Key Check
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("CHILI CHEF ERROR: GEMINI_API_KEY is missing from process.env");
    return res.status(500).json({ error: "Server configuration error: Missing API Key" });
  }

  // 2. Input Validation
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { foodItem, ritualMode, lang = 'es' } = req.body;
  if (!foodItem) {
    return res.status(400).json({ error: "Missing foodItem in request body" });
  }

  // 3. Model Configuration — gemini-1.5-flash is recommended for higher Free Tier quota
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  console.log("[ChefAPI] Using model:", model);

  try {
    // 4. Prompt Construction with Culinary Intelligence
    const systemInstruction = `You are "The Chili Jungle Chef" (AI).
    Your personality: Bold, culinary-obsessed, slightly mysterious, and witty.
    
    PRODUCT CONTEXT:
    1. 'clasico': Balanced Heat. Red Habanero. Pairs with pizza, pasta, meats.
    2. 'tropical': Sweet & Spicy. Yellow Habanero + Pineapple. Pairs with tacos, fish, breakfast.
    3. 'luxe': A mode/mood. NOT a product. Always recommend 'clasico' or 'tropical'.
    
    RULES:
    - If user enters vulgar, offensive, or silly nonsense: Return a silly/mysterious response in the JSON but stay in character.
    - If user enters liquids (Soda, Water, Juice, Soup): Remind them that oil doesn't mix with liquids! Suggest a SOLID food that goes well with that liquid and add the Chili Jungle ritual to THAT food.
    - Always return valid JSON matching the requested schema.
    - Language: ${lang === 'es' ? 'Spanish' : 'English'}.`;

    const promptText = `User food/input: "${foodItem}". Ritual Mode: "${ritualMode}".
    Generate a pairing suggestion with title, description, ingredients list, and steps.
    Ensure "recommendedProduct" is strictly either "clasico" or "tropical".`;

    // 5. Direct REST Call — Using v1beta for system_instruction and JSON mode support
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: promptText }]
          }
        ],
        generationConfig: {
          response_mime_type: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Gemini API error (${response.status}): ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    // 6. Safe Response Parsing
    // Path: data.candidates[0].content.parts[0].text
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      const resultText = data.candidates[0].content.parts[0].text;
      
      // 7. Return clean JSON envelope
      // Note: We return { result: resultText } as requested, but the resultText IS the JSON string.
      return res.status(200).json({ result: resultText });
    } else {
      throw new Error("Invalid response structure from Gemini API");
    }

  } catch (error: any) {
    console.error("CHILI CHEF ERROR:", error);
    return res.status(500).json({ 
      error: "El Chef está ocupado. Intenta de nuevo más tarde.",
      message: error.message 
    });
  }
}
