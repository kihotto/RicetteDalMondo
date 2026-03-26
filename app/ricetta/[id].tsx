import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

import InfoRicetta from '../../components/ricetta/InfoRicetta';
import DettagliRicetta from '../../components/ricetta/DettagliRicetta';
import { RecipeProvider } from '../../contexts/RecipeContex';
import { fetchRecipeById } from '../../lib/api';

export default function PaginaRicetta() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadRecipe = async () => {
      try {
        const data = await fetchRecipeById(id as string);
        setRecipe(data);
      } catch (error) {
        console.error('Errore caricamento ricetta', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!recipe) {
    return <Text>Ricetta non trovata</Text>;
  }

  return (
    <RecipeProvider recipe={recipe}>
      <View
        className="flex-1 border-b bg-[#eceff1]"
        style={{ marginBottom: insets.bottom, paddingTop: insets.top }}>
        <StatusBar barStyle={'light-content'} />

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

        {/* COVER */}
        <View className="h-80 w-full">
          <Image
            source={{
              uri:
                recipe.imageUrl ||
                'https://via.placeholder.com/800x600.png?text=Immagine+non+disponibile',
            }}
            className="h-full w-full"
            resizeMode="cover"
          />
          <View className="absolute  bottom-20 left-0 right-0">
            <InfoRicetta sizeIcons={15} />
          </View>
        </View>

        {/* BODY */}
        <View className="-mt-12 flex-1 rounded-t-[45] border-t bg-[#eceff1] px-2 pt-2">
          <ScrollView
            className="flex-1 rounded-t-[45] border"
            bounces={false}
            showsVerticalScrollIndicator={false}>
            <View className="my-2 px-4">
              <DettagliRicetta />
            </View>
          </ScrollView>
        </View>
      </View>
    </RecipeProvider>
  );
}
