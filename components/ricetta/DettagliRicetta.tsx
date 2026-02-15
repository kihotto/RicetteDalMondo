import { View, Text } from 'react-native';
import { useRecipe } from '../../contexts/RecipeContex';
export default function DettagliRicetta() {
  const { recipe } = useRecipe();
  return (
    <View className="gap-2">
      <View>
        <Text className="text-lg font-bold capitalize">Ingredienti</Text>
        <Text>{recipe?.ingredienti}</Text>
      </View>
      <View>
        <Text className="text-lg font-bold capitalize">Preparazione</Text>
        <Text>{recipe?.preparazione}</Text>
      </View>
      <View>
        <Text className="text-lg font-bold capitalize">Altre info</Text>
        <Text>{recipe?.difficolta} </Text>
      </View>
    </View>
  );
}
