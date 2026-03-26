import { View } from 'react-native';
import InfoCard from './interfaccia/InfoCard';
import { useRecipe } from '../../contexts/RecipeContex';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function InfoRicetta({ sizeIcons = 20 }: { sizeIcons?: number }) {
  const { recipe } = useRecipe();
  const RenderDifficulty = () => {
    switch (recipe?.difficolta) {
      case 'Facile':
        return <MaterialCommunityIcons name="fire" size={sizeIcons} color="green" />;
      case 'Media':
        return <MaterialCommunityIcons name="fire" size={sizeIcons} color="orange" />;
      case 'Difficile':
        return <MaterialCommunityIcons name="fire" size={sizeIcons} color="red" />;

      default:
        break;
    }
  };
  const RenderCosto = () => {
    switch (recipe?.costoPerPersona) {
      case 'Basso':
        return <MaterialIcons name="euro" size={sizeIcons} color="green" />;
      case 'Medio':
        return <MaterialIcons name="euro" size={sizeIcons} color="orange" />;
      case 'Alto':
        return <MaterialIcons name="euro" size={sizeIcons} color="red" />;

      default:
        break;
    }
  };
  console.log('RECIPE INFO', recipe?.costoPerPersona);
  return (
    <View className="flex-1 flex-col justify-evenly gap-2 px-2">
      {/* TODO creare componente del visualizzatore  */}
      <View className="flex-1 flex-row gap-2">
        <InfoCard
          icon={<Ionicons name="timer" size={sizeIcons} color="#333" />}
          preText="Pronto in"
          value={recipe?.tempoPreparazione}
          overrideW="!min-w-[140]"
          identifier={recipe?.tempoPreparazioneUnita}
        />
        <InfoCard
          icon={<Ionicons name="timer" size={sizeIcons} color="#333" />}
          preText="Cotto in"
          value={recipe?.tempoCottura}
          overrideW="!min-w-[140]"
          identifier={recipe?.tempoCotturaUnita}
        />
      </View>
      <View className="flex-row gap-2">
        <InfoCard
          icon={<Fontisto name="persons" size={sizeIcons} color="#333" />}
          preText="Per"
          value={recipe?.porzioni}
          identifier="prz"
        />
        <InfoCard icon={RenderCosto()} preText="Costo" overrideW="!max-w-[80]" />
        <InfoCard icon={RenderDifficulty()} preText="Difficoltà" />
      </View>
    </View>
  );
}
