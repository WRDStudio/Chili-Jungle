import { VercelRequest, VercelResponse } from '@vercel/node';

// Chili Jungle Chef — Zero-Dependency Production API
// Uses direct REST call to Gemini to avoid SDK overhead and versioning issues

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Strict API Key Check
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("[ChefAPI] OpenAI Error: OPENAI_API_KEY is missing from process.env");
    return res.status(500).json({ error: "Server configuration error: Missing OpenAI API Key" });
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
  const model = process.env.OPENAI_MODEL || "gpt-5.4-nano";
  console.log("[ChefAPI] Using OpenAI model:", model);

  try {
    // 4. Prompt Construction
    const systemPrompt = `You are "The Chili Jungle Chef". Bold, culinary-obsessed, witty.
    
    PRODUCT CONTEXT:
    1. 'clasico': Balanced Heat. Red Habanero. Pairs with pizza, pasta, meats.
    2. 'tropical': Sweet & Spicy. Yellow Habanero + Pineapple. Pairs with tacos, fish, breakfast.
    3. 'luxe': A mood. Always recommend 'clasico' or 'tropical'.
    
    RULES:
    - User input must be edible/food. If not (vulgar, absurd, non-food), reject firmly but stay in character.
    - If input is liquid (Soda, Water, etc.), explain that oil doesn't mix with liquids and suggest a SOLID food pairing instead.
    - Output MUST be strict valid JSON. No markdown backticks.
    - Language: ${lang === 'es' ? 'Spanish' : 'English'}.`;

    const userPrompt = `Input: "${foodItem}". Ritual Mode: "${ritualMode}".
    Generate a pairing following this JSON schema:
    {
      "title": "string",
      "description": "string",
      "ingredients": ["string"],
      "steps": ["string"],
      "recommendedProduct": "clasico" | "tropical"
    }`;

    // 5. Direct REST Call to OpenAI
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error (${response.status}): ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const resultText = data.choices[0]?.message?.content;
    
    if (!resultText) {
      throw new Error("Empty response from OpenAI");
    }

    // 6. Final Parsing & Response
    // We clean markdown fences just in case, though response_format: "json_object" should prevent them.
    const cleanedJsonText = resultText.replace(/```json\n?|```/g, '').trim();
    const parsedObject = JSON.parse(cleanedJsonText);
    
    // We return the clean project directly (no {result: string} wrapper)
    return res.status(200).json(parsedObject);

  } catch (error: any) {
    console.error("[ChefAPI] OpenAI Error:", error);
    return res.status(500).json({ 
      error: error?.message || 'Chef failed'
    });
  }
}
