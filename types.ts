export type RitualMode = 'luxe' | 'classic' | 'tropical';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  heatLevel: number;
  imageUrl: string;
  tags: string[];
  mode: RitualMode | 'all';
  ingredients: string;
}

export interface RecipeSuggestion {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  recommendedProduct: 'clasico' | 'tropical';
}

export interface RitualTheme {
  bg: string;
  text: string;
  accent: string;
  border: string;
  button: string;
  buttonText: string;
  name: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover_url: string;
  audio_url: string;
  theme: 'luxe' | 'classic' | 'tropical';
}