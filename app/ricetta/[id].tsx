import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StatusBar, ScrollView } from 'react-native';

import InfoRicetta from '../../components/ricetta/InfoRicetta';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DettagliRicetta from '../../components/ricetta/DettagliRicetta';
import { RecipeProvider, useRecipe } from '../../contexts/RecipeContex';
import { MOCK_RICETTE } from '../../lib/constants';
/// simulazione  se avessimo un db

export default function PaginaRicetta() {
  const { id } = useLocalSearchParams(); /// con un db dovremmo usare questo id per filtrare  la ricetta
  const insets = useSafeAreaInsets();

  /*  TODO Serve hook per la ricerca da aggiungere appena abbiamo il db */
  let recipe: any = null;
  for (const country of MOCK_RICETTE) {
    recipe = country.recipes.find((r) => r.id === Number(id));
    if (recipe) break;
  }

  if (!recipe) {
    return <Text>Ricetta non trovata</Text>;
  }

  return (
    <RecipeProvider recipe={recipe}>
      <View
        className=" flex-1 border-b bg-[#eceff1]"
        style={{ marginBottom: insets.bottom, paddingTop: insets.top }}>
        <StatusBar barStyle={'light-content'} />
        {/* stack necessario per navigazione e info base */}
        {
          <Stack.Screen
            options={{
              headerTitle: '',
              headerShown: true,
              headerTransparent: true,
              headerShadowVisible: false,
              headerStyle: { backgroundColor: 'transparent' },
              headerTintColor: '#f2994a',
              headerBackTitle: '',
            }}
          />
        }
        {/* Immagine cover della ricetta */}

        <View className="h-80 w-full">
          <Image
            source={{
              uri: 'https://blog.giallozafferano.it/allacciateilgrembiule/wp-content/uploads/2021/01/patatine-fritte-fatte-in-casa.jpg',
            }}
            className="h-full w-full"
            resizeMode="cover"
          />
        </View>
        <View className="-mt-12 flex-1 rounded-t-[45] border-t bg-[#eceff1] px-2 pt-2">
          <ScrollView
            style={{
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 3,
            }}
            className="flex-1 rounded-t-[45] border"
            bounces={false}
            showsVerticalScrollIndicator={false}>
            {/*  <View className="my-2">
              <Text>{recipe.title}</Text>
            </View> */}
            <View className="my-2">
              <InfoRicetta />
            </View>
            <View className="my-2 px-4">
              <DettagliRicetta />
            </View>
          </ScrollView>
        </View>
      </View>
    </RecipeProvider>
  );
}
