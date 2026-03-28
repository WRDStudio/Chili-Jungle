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
      let errorData: any = {};
      try {
        errorData = await response.json();
      } catch (e) {
        // Fallback if Vercel returns HTML or string
      }
      throw new Error(errorData.error || `Chef service error: Status ${response.status}`);
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