const BASE_URL = '';
//http://192.168.1.35:8082/api  base url da copiare
//controllare ip!! cambia spesso
export async function fetchRecipesByCountry(country: string) {
  const response = await fetch(`${BASE_URL}/recipes/country/${country}`);

  if (!response.ok) {
    throw new Error('Errore fetch recipes');
  }

  return response.json();
}

export async function fetchRecipeById(id: string) {
  const response = await fetch(`${BASE_URL}/recipes/${id}`);

  if (!response.ok) {
    throw new Error('Errore fetch recipe');
  }

  return response.json();
}
