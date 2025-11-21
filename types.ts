export type RitualMode = 'luxe' | 'classic' | 'tropical';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  heatLevel: number; // 1-5
  imageUrl: string;
  tags: string[];
  mode: RitualMode | 'all';
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  location: string;
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