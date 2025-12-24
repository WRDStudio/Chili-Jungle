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