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

  // 3. Model Configuration
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  console.log("[ChefAPI] Using model:", model);

  try {
    // 4. Prompt Construction - Using stable v1 format (or v1beta depending on model)
    const combinedPrompt = `Persona: You are "The Chili Jungle Chef". Bold, culinary-obsessed, witty.
    
    PRODUCT CONTEXT:
    1. 'clasico': Balanced Heat. Red Habanero. Pairs with pizza, pasta, meats.
    2. 'tropical': Sweet & Spicy. Yellow Habanero + Pineapple. Pairs with tacos, fish, breakfast.
    3. 'luxe': A mood. Recommend 'clasico' or 'tropical'.
    
    RULES:
    - If input is vulgar/silly: Return a silly joke but stay in character.
    - If input is liquid (Soda, Water, etc.): Remind them oil doesn't mix with liquids! Suggest a SOLID food pairing instead.
    - Output must be strict JSON matching this schema:
      {
        "title": "Pairing Title",
        "description": "Short witty description",
        "ingredients": ["Item 1", "Item 2"],
        "steps": ["Step 1", "Step 2"],
        "recommendedProduct": "clasico" | "tropical"
      }
    - Language: ${lang === 'es' ? 'Spanish' : 'English'}.
    
    User input: "${foodItem}". Ritual Mode: "${ritualMode}".`;

    // 5. Direct REST Call — Switching to v1beta for better model support
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: combinedPrompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
          response_mime_type: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Gemini API error (${response.status}): ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      const resultText = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ result: resultText });
    } else {
      throw new Error("Invalid response structure from Gemini API");
    }

  } catch (error: any) {
    console.error("CHILI CHEF ERROR:", error);
    return res.status(500).json({ 
      error: error?.message || 'Chef failed'
    });
  }
}
