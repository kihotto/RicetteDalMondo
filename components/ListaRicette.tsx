import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useRecipes } from '../hooks/useRecipes';
import { Recipe } from '../contexts/RecipeContex';

interface ListaRicetteProps {
  country: string;
}

export default function ListaRicette({ country }: ListaRicetteProps) {
  const router = useRouter();

  const { recipes, loading, error, hasNoRecipe } = useRecipes(country);

  const handleRecipePress = (recipe: Recipe) => {
    router.push(`/ricetta/${recipe.id}`);
  };

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      className="mb-3 h-[70px] w-[48%] flex-row items-center rounded-2xl border border-white/30 px-2.5 py-2.5"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      }}
      onPress={() => handleRecipePress(item)}
      activeOpacity={0.8}>
      {/* IMMAGINE */}
      <View
        className="mr-2.5 h-[50px] w-[50px] items-center justify-center rounded-full border border-white/40"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.10)',
        }}>
        <Text className="text-xl text-white">🍽️</Text>
      </View>

      {/* TITOLO */}
      <Text className="flex-1 text-[15px] font-semibold text-white" numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Errore caricamento ricette</Text>
      </View>
    );
  }

  if (loading || !hasNoRecipe) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold text-white">Lo chef sta cercando il ricettario..</Text>
        <ActivityIndicator size="large" color={'#ffffff'} />
      </View>
    );
  }

  if (recipes.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-4 ">
        <Text className="text-xl font-bold text-white ">Lo chef non ha trovato ricette..</Text>
        <Text className="text-xl font-bold text-white">Prova con un altra Nazione!</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* HEADER - Nome del paese */}
      <View className="px-5 pb-4 pt-5">
        <View
          className="rounded-2xl border border-white/30 px-4 py-3.5"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}>
          <Text className="text-[27px] font-bold text-white">{country}</Text>

          <Text className="mt-1 text-[13px] font-medium text-white/80">
            {recipes.length} {recipes.length === 1 ? 'ricetta' : 'ricette'}
          </Text>
        </View>
      </View>

      {/* LISTA */}
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperClassName="justify-between"
        contentContainerClassName="px-5 pt-2 pb-5"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
