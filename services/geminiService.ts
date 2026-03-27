import { RecipeSuggestion } from "../types";

export const generateRecipePairing = async (foodItem: string, ritualMode: string): Promise<RecipeSuggestion | null> => {
  try {
    const response = await fetch('/api/chili-chef', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ foodItem, ritualMode }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch recipe from chef');
    }

    const data = await response.json();
    
    // The backend now returns { result: string } where result is the AI JSON
    if (data.result) {
      try {
        const parsed = JSON.parse(data.result);
        return parsed as RecipeSuggestion;
      } catch (e) {
        console.error("Failed to parse AI response inner JSON:", e);
        throw new Error("Invalid response format from AI");
      }
    }

    return data as RecipeSuggestion;

  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};