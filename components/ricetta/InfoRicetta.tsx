import { View } from 'react-native';
import InfoCard from './interfaccia/InfoCard';
import { useRecipe } from '../../contexts/RecipeContex';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function InfoRicetta() {
  const { recipe } = useRecipe();
  const RenderDifficulty = () => {
    switch (recipe?.difficolta) {
      case 'Facile':
        return <MaterialCommunityIcons name="fire" size={30} color="green" />;
      case 'Media':
        return <MaterialCommunityIcons name="fire" size={30} color="orange" />;
      case 'Difficile':
        return <MaterialCommunityIcons name="fire" size={30} color="red" />;

      default:
        break;
    }
  };
  const RenderCosto = () => {
    switch (recipe?.costoPerPersona) {
      case 'Basso':
        return <MaterialIcons name="euro" size={30} color="green" />;
      case 'Medio':
        return <MaterialIcons name="euro" size={30} color="orange" />;
      case 'Alto':
        return <MaterialIcons name="euro" size={30} color="red" />;

      default:
        break;
    }
  };
  return (
    <View className="flex-1 flex-row justify-evenly px-2 ">
      {/* TODO creare componente del visualizzatore  */}

      <InfoCard
        icon={<Ionicons name="timer" size={30} color="black" />}
        value={recipe?.tempoPreparazione}
        identifier={recipe?.tempoPreparazioneUnita}
      />
      <InfoCard
        icon={<Ionicons name="timer" size={30} color="black" />}
        value={recipe?.tempoCottura}
        identifier={recipe?.tempoCotturaUnita}
      />
      <InfoCard
        icon={<Fontisto name="persons" size={30} color="black" />}
        value={recipe?.porzioni}
        identifier="prz"
      />
      <InfoCard icon={RenderCosto()} />
      <InfoCard icon={RenderDifficulty()} />
    </View>
  );
}
