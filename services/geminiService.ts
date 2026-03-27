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
    return data as RecipeSuggestion;

  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};