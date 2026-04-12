import { useEffect, useState } from 'react';
import { fetchRecipesByCountry } from '../lib/api';
import { Recipe } from '../contexts/RecipeContex';

export function useRecipes(country: string) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNoRecipe, setHasNoRecipe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!country) {
      setRecipes([]);
      setHasNoRecipe(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setHasNoRecipe(false);
        const data = await fetchRecipesByCountry(country);
        setRecipes(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
        setHasNoRecipe(true);
      }
    };

    load();
  }, [country]);

  return { recipes, loading, hasNoRecipe, error };
}
