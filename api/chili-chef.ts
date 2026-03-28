import { VercelRequest, VercelResponse } from '@vercel/node';

// Chili Jungle Chef — Zero-Dependency Production API
// Hardened with caching, input deduplication, and rate limiting to optimize costs

// In-memory mappings persist during Vercel internal "warm starts"
const cache = new Map<string, { data: any, timestamp: number }>();
const ipRequests = new Map<string, number[]>(); // IP -> array of timestamps

// Configuration
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_60S = 1;
const RATE_LIMIT_60M = 10;
const WINDOW_60S_MS = 60 * 1000;
const WINDOW_60M_MS = 60 * 60 * 1000;

function normalizeInput(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, ' ');
}

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

  const now = Date.now();

  // 3. Lightweight Rate Limiting
  let clientIp = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || 'unknown';
  if (clientIp.includes(',')) {
    clientIp = clientIp.split(',')[0].trim();
  }
  
  let timestamps = ipRequests.get(clientIp) || [];
  // Clean up old timestamps beyond 60 minutes
  timestamps = timestamps.filter(ts => now - ts < WINDOW_60M_MS);
  
  const recent60s = timestamps.filter(ts => now - ts < WINDOW_60S_MS);
  if (recent60s.length >= RATE_LIMIT_60S || timestamps.length >= RATE_LIMIT_60M) {
    console.warn(`[ChefAPI] RATE_LIMIT: ip=${clientIp} requests60s=${recent60s.length} requests60m=${timestamps.length}`);
    const errorMsg = lang === 'es' 
      ? "El Chef ya está preparando otra recomendación. Espera un momento antes de pedir una nueva."
      : "The Chef is already preparing another recommendation. Please wait a moment before trying again.";
    
    return res.status(429).json({ error: errorMsg });
  }
  // Record new request
  timestamps.push(now);
  ipRequests.set(clientIp, timestamps);

  // 4. Input Normalization & Caching
  const normalizedFoodItem = normalizeInput(foodItem);
  const cacheKey = `${normalizedFoodItem}|${ritualMode}|${lang}`;
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse && (now - cachedResponse.timestamp) < CACHE_TTL_MS) {
    console.log(`[ChefAPI] CACHE_HIT: key="${cacheKey}"`);
    return res.status(200).json(cachedResponse.data);
  }

  console.log(`[ChefAPI] FRESH: key="${cacheKey}"`);

  // 5. Model Configuration
  const model = process.env.OPENAI_MODEL || "gpt-5.4-nano";
  
  try {
    // 6. Prompt Construction
    const systemPrompt = `You are "The Chili Jungle Chef". Bold, culinary-obsessed, witty.
    
    PRODUCT CONTEXT:
    1. 'clasico': Balanced Heat. Red Habanero. Pairs with pizza, pasta, meats.
    2. 'tropical': Sweet & Spicy. Yellow Habanero + Pineapple. Pairs with tacos, fish, breakfast.
    3. 'luxe': A mood. Always recommend 'clasico' or 'tropical'.
    
    RULES:
    - User input must be edible/food. If not (vulgar, absurd, non-food), reject firmly but stay in character.
    - If input is liquid (Soda, Water, etc.), explain that oil doesn't mix with liquids and suggest a SOLID food pairing instead.
    - Output MUST be strict valid JSON. No markdown backticks.
    - Keep output compact and premium: short title, concise description, 3-5 ingredients max, 2-4 steps max. No long prose.
    - Language: ${lang === 'es' ? 'Spanish' : 'English'}.`;

    const userPrompt = `Input: "${normalizedFoodItem}". Ritual Mode: "${ritualMode}".
    Generate a pairing following this JSON schema:
    {
      "title": "string",
      "description": "string",
      "ingredients": ["string"],
      "steps": ["string"],
      "recommendedProduct": "clasico" | "tropical"
    }`;

    // 7. Direct REST Call to OpenAI
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
        max_tokens: 350,
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

    // 8. Final Parsing & Response
    const cleanedJsonText = resultText.replace(/```json\n?|```/g, '').trim();
    const parsedObject = JSON.parse(cleanedJsonText);
    
    // Store in cache
    cache.set(cacheKey, { data: parsedObject, timestamp: now });

    // Return the clean JSON object directly
    return res.status(200).json(parsedObject);

  } catch (error: any) {
    console.error("[ChefAPI] OpenAI Error:", error);
    return res.status(500).json({ 
      error: error?.message || 'Chef failed'
    });
  }
}
