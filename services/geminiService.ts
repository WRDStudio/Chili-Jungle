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
    
    // The backend now returns the flat JSON object directly (Requirement 8)
    if (data && typeof data === 'object' && 'title' in data) {
      return data as RecipeSuggestion;
    }
    
    throw new Error("Invalid response format from Chef API");
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};