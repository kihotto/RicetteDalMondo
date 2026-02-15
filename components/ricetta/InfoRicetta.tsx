import { View, Image, Text } from 'react-native';
import InfoCard from './interfaccia/InfoCard';
import { useRecipe } from '../../contexts/RecipeContex';

export default function InfoRicetta() {
  const { recipe } = useRecipe();
  return (
    <View className="flex-1 flex-row justify-evenly px-2 ">
      {/* TODO creare componente del visualizzatore  */}

      <InfoCard
        icon={require('../../assets/favicon.png')}
        value={recipe?.tempoPreparazione}
        identifier={recipe?.tempoPreparazioneUnita}
      />
      <InfoCard
        icon={require('../../assets/favicon.png')}
        value={recipe?.tempoCottura}
        identifier={recipe?.tempoCotturaUnita}
      />
      <InfoCard
        icon={require('../../assets/favicon.png')}
        value={recipe?.porzioni}
        identifier="prz"
      />
      <InfoCard icon={require('../../assets/favicon.png')} value={recipe?.costoPerPersona} />
      <InfoCard icon={require('../../assets/favicon.png')} value={recipe?.difficolta} />
    </View>
  );
}
