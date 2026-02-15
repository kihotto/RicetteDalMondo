<<<<<<< Updated upstream
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function WelcomePage() {
=======
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';

export default function HomeTab() {
  const selectedState = 'Italy';

  const recipes = [
    { id: '1', name: 'Carbonara' },
    { id: '2', name: 'Pesto'},
    { id: '3', name: 'Tiramisu'},
    { id: '4', name: 'Pizza prosciutto e funghi'},
    { id: '5', name: 'Lasagne'},
    { id: '6', name: 'Focaccia di Recco allo stracchino'},
    { id: '7', name: 'Gnocchi al ragù'},
    { id: '8', name: 'Risotto alla milanese'},
    { id: '9', name: 'Osso buco'},
    { id: '10', name: 'Saltimbocca alla romana'},
    { id: '11', name: 'Caponata siciliana'},
    { id: '12', name: 'Arancini di riso'},
  ];

  const handleRecipePress = (recipe: any) => {
    console.log('Ricetta selezionata:', recipe.name);
  };

  // ---- Renderizza ogni singola ricetta ----
  const renderRecipe = ({ item }: { item: any }) => (
    <TouchableOpacity 
      className="w-[48%] h-[70px] flex-row items-center px-2.5 py-2.5 rounded-2xl border border-white/30 mb-3"
      style={{
        // Effetto glass impossibile senza expo-blurr
        backgroundColor: 'rgba(255, 255, 255, 0.08)', // 8% bianco opaco = finto effetto blurr
      }}
      onPress={() => handleRecipePress(item)}
      activeOpacity={0.7}
    >
      {/* IMMAGINE - Cerchio con bordo */}
      <View 
        className="w-[50px] h-[50px] rounded-full justify-center items-center mr-2.5 border border-white/40"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.10)', // Sfondo cerchi, bianco 10% opaco
        }}
      >
        <Text 
          className="text-2xl"
          style={{
            textShadowColor: 'rgba(0, 0, 0, 0.8)', // Ombra nel cerchio
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 3,
          }}
        >
          🍕 {/* --- Placeholder ---*/}
        </Text>
      </View>

      {/* NOME RICETTA */}
      <Text 
        className="flex-1 text-[15px] font-semibold text-white"
        numberOfLines={2}
        style={{
          letterSpacing: 0.2,
          textShadowColor: 'rgba(0, 0, 0, 0.8)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 4,
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

>>>>>>> Stashed changes
  return (
    <ImageBackground 
      source={require('../assets/scales.png')} /* SFONDO ----- */
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      
      {/* HEADER - Effetto vetro smerigliato */}
      <View className="px-5 pt-5 pb-4">
        <View 
          className="py-3.5 px-4 rounded-2xl border border-white/30"
          style={{
            // Vetro smerigliato: background leggero + bordo luminoso
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // 10% bianco trasparente
          }}
        >
          {/* Testo header */}
          {/* <Text 
            className="text-[13px] text-white font-semibold"
            style={{
              letterSpacing: 0.5,
              textShadowColor: 'rgba(0, 0, 0, 0.8)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 4,
            }}
          >{/* se si vuole scrivere qualcosa prima dello stato --- 
          </Text> */}
          
          {/* Nome stato */}
          <Text 
            className="text-[27px] text-white font-bold mt-0.5"
            style={{
              letterSpacing: 0.3,
              textShadowColor: 'rgba(0, 0, 0, 0.8)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 4,
            }}
          >
            {selectedState}
          </Text>
        </View>
      </View>

      {/* LISTA RICETTE */}
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperClassName="justify-between"
        contentContainerClassName="px-5 pt-2 pb-5"
        showsVerticalScrollIndicator={false}
      />
      
    </ImageBackground>
  );
}
