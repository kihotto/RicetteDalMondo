import React, { createContext, useContext } from 'react';
interface Recipe {
  id: number;
  title: string;
  ingredienti?: string;
  tempoPreparazione?: number;
  tempoCottura?: number;
  porzioni?: number;
  costoPerPersona?: string;
  difficolta?: string;
  preparazione?: string;
  categoria?: string;
  imageUrl?: string;
  [key: string]: any;
}
interface RecipeContexType {
  recipe: Recipe | null;
}
const RecipeContex = createContext<RecipeContexType | undefined>(undefined);

export const RecipeProvider: React.FC<{ recipe: Recipe; children: React.ReactNode }> = ({
  recipe,
  children,
}) => {
  return <RecipeContex.Provider value={{ recipe }}>{children}</RecipeContex.Provider>;
};

export const useRecipe = (): RecipeContexType => {
  const context = useContext(RecipeContex);
  if (!context) throw new Error('useRecipe deve essere usato allinterno di Recipe provider');
  return context;
};
