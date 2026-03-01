import { useEffect, useState } from 'react';
import { fetchRecipesByCountry } from '../lib/api';
import { Recipe } from '../contexts/RecipeContex';

export function useRecipes(country: string) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!country) return;

    const load = async () => {
      try {
        setLoading(true);

        const data = await fetchRecipesByCountry(country);

        setRecipes(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [country]);

  return { recipes, loading, error };
}
