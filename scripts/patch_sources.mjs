import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// --- Patch ProductShowcase.tsx ---
const showcasePath = join(root, 'components', 'ProductShowcase.tsx');
let showcase = readFileSync(showcasePath, 'utf8');

const oldShowcaseCall = `onOpenOrder(prod.id as 'classic' | 'tropical')`;
const newShowcaseCall = "onOpenOrder(prod.id as 'classic' | 'tropical', `product_showcase_${prod.id}`)";

if (showcase.includes(oldShowcaseCall)) {
  showcase = showcase.replace(oldShowcaseCall, newShowcaseCall);
  writeFileSync(showcasePath, showcase, 'utf8');
  console.log('✅ ProductShowcase.tsx patched');
} else {
  console.log('⚠️  ProductShowcase.tsx: pattern not found — check manually');
}

// --- Patch Recipes.tsx ---
const recipesPath = join(root, 'components', 'Recipes.tsx');
let recipes = readFileSync(recipesPath, 'utf8');

// Update prop type
const oldRecipesProp = `onOpenOrder: (product: 'classic' | 'tropical') => void;`;
const newRecipesProp = `onOpenOrder: (product: 'classic' | 'tropical', source?: string) => void;`;

if (recipes.includes(oldRecipesProp)) {
  recipes = recipes.replace(oldRecipesProp, newRecipesProp);
  console.log('✅ Recipes.tsx prop type patched');
} else {
  console.log('⚠️  Recipes.tsx: prop type pattern not found');
}

// Update the onOpenOrder call in Recipes
const oldRecipesCall = `onOpenOrder(selectedRecipe.suggestedVariant === 'Tropical' ? 'tropical' : 'classic')`;
const newRecipesCall = "onOpenOrder(selectedRecipe.suggestedVariant === 'Tropical' ? 'tropical' : 'classic', `recipe_modal_${selectedRecipe.suggestedVariant.toLowerCase()}`)";

if (recipes.includes(oldRecipesCall)) {
  recipes = recipes.replace(oldRecipesCall, newRecipesCall);
  writeFileSync(recipesPath, recipes, 'utf8');
  console.log('✅ Recipes.tsx call patched');
} else {
  console.log('⚠️  Recipes.tsx: call pattern not found');
}
