import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';

// ------------------- INTERFACCIA PROPS -------------------
interface ListaRicetteProps { // Definisce la prop(erty) che l'interfaccia riceve
  country: string; // Nome del paese selezionato dal globo
}

// ------------------- DATABASE FITTIZIO -------------------
// Ricette organizzate per paese
const RICETTE_PER_PAESE: { [key: string]: Array<{ id: string; name: string }> } = {
  'Italy': [
    { id: '1', name: 'Carbonara' },
    { id: '2', name: 'Pesto'},
    { id: '3', name: 'Tiramisu'},
    { id: '4', name: 'Pizza Margherita'},
    { id: '5', name: 'Lasagne'},
    { id: '6', name: 'Focaccia di Recco'},
    { id: '7', name: 'Gnocchi al ragù'},
    { id: '8', name: 'Risotto alla milanese'},
  ],
  'France': [
    { id: '1', name: 'Croissant' },
    { id: '2', name: 'Ratatouille'},
    { id: '3', name: 'Coq au Vin'},
    { id: '4', name: 'Crème Brûlée'},
    { id: '5', name: 'Quiche Lorraine'},
    { id: '6', name: 'Bouillabaisse'},
  ],
  'Spain': [
    { id: '1', name: 'Paella' },
    { id: '2', name: 'Gazpacho'},
    { id: '3', name: 'Tortilla Española'},
    { id: '4', name: 'Jamón Ibérico'},
    { id: '5', name: 'Churros'},
  ],
  'Japan': [
    { id: '1', name: 'Sushi' },
    { id: '2', name: 'Ramen'},
    { id: '3', name: 'Tempura'},
    { id: '4', name: 'Tonkatsu'},
    { id: '5', name: 'Okonomiyaki'},
  ],
  'Mexico': [
    { id: '1', name: 'Tacos' },
    { id: '2', name: 'Guacamole'},
    { id: '3', name: 'Enchiladas'},
    { id: '4', name: 'Quesadilla'},
    { id: '5', name: 'Chiles en Nogada'},
  ],
  'India': [
    { id: '1', name: 'Butter Chicken' },
    { id: '2', name: 'Biryani'},
    { id: '3', name: 'Samosa'},
    { id: '4', name: 'Tikka Masala'},
    { id: '5', name: 'Naan'},
  ],
  'United States of America': [
    { id: '1', name: 'Burger' },
    { id: '2', name: 'BBQ Ribs'},
    { id: '3', name: 'Mac and Cheese'},
    { id: '4', name: 'Apple Pie'},
    { id: '5', name: 'Hot Dog'},
  ],
  'China': [
    { id: '1', name: 'Peking Duck' },
    { id: '2', name: 'Dim Sum'},
    { id: '3', name: 'Kung Pao Chicken'},
    { id: '4', name: 'Sweet and Sour Pork'},
    { id: '5', name: 'Spring Rolls'},
  ],
  // Default per paesi senza ricette
  'default': [
    { id: '1', name: 'No recipes available' },
  ],
};

// ------------------- LE SEGUENTI EMOJI SONO RIMPIAZZO PER LE IMMAGINI  -------------------
const EMOJI_PAESE: { [key: string]: string } = {
  'Italy': '🍝',
  'France': '🥐',
  'Spain': '🥘',
  'Japan': '🍱',
  'Mexico': '🌮',
  'India': '🍛',
  'United States of America': '🍔',
  'China': '🥢',
  'default': '🍽️',
};

export default function ListaRicette({ country }: ListaRicetteProps) {
  // ------------------- LOGICA RICETTE -------------------
  // Prende le ricette del paese selezionato, o quelle di default se il paese non esiste (possibili preferiti?)
  const recipes = RICETTE_PER_PAESE[country] || RICETTE_PER_PAESE['default'];
  
  // Emoji per il paese (temporary)
  const emoji = EMOJI_PAESE[country] || EMOJI_PAESE['default'];

  // ------------------- HANDLER -------------------
  const handleRecipePress = (recipe: any) => {
    console.log(`Ricetta selezionata da ${country}:`, recipe.name);
    // Questo è per la navigazione alla pagina di dettaglio
    // navigation.navigate('RecipeDetail', { recipeId: recipe.id, country });
  };

  // ------------------- STILE SINGOLE CARTE RICETTA -------------------
  const renderRecipe = ({ item }: { item: any }) => (
    <TouchableOpacity 
      className="w-[48%] h-[70px] flex-row items-center px-2.5 py-2.5 rounded-2xl border border-white/30 mb-3"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      }}
      onPress={() => handleRecipePress(item)} // Quando si preme una ricetta, chiama l'handler per passare alla ricetta selezionata
      activeOpacity={0.8} // Leggero feedback al tocco
    >
      {/* IMMAGINE - Cerchio con emoji del paese */}
      <View 
        className="w-[50px] h-[50px] rounded-full justify-center items-center mr-2.5 border border-white/40"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.10)',
        }}
      >
        <Text 
          className="text-2xl"
          style={{
            textShadowColor: 'rgba(0, 0, 0, 0.8)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 3,
          }}
        >
          {emoji}
        </Text>
      </View>

      {/* NOME RICETTA */}
      <Text 
        className="flex-1 text-[15px] font-semibold text-white"
        numberOfLines={2} // Limita a 2 righe per evitare overflow
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

  return (
    <ImageBackground 
      source={require('../assets/scales.png')}
      className="flex-1 w-full h-full" // 100% larghezza e altezza del container
      resizeMode="cover"
    >
      
      {/* HEADER - Nome del paese */}
      <View className="px-5 pt-5 pb-4">
        <View 
          className="py-3.5 px-4 rounded-2xl border border-white/30"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Nome paese selezionato */}
          <Text 
            className="text-[27px] text-white font-bold"
            style={{
              letterSpacing: 0.3,
              textShadowColor: 'rgba(0, 0, 0, 0.8)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 4,
            }}
          >
            {country}
          </Text>
          
          {/* Numero ricette */}
          <Text 
            className="text-[13px] text-white/80 font-medium mt-1"
            style={{
              textShadowColor: 'rgba(0, 0, 0, 0.6)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 3,
            }}
          >
            {recipes.length} {recipes.length === 1 ? 'ricetta' : 'ricette'}
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

/*


------------- PROPS: Riceve `country` dal componente padre (WelcomePage)c

------------ CON DATABASE VERO:

--Quando ci sarà un database:

--hook o funzione fetch:
   const { recipes, loading } = useRecipes(country);

--Sostituire la riga:
   const recipes = RICETTE_PER_PAESE[country] || ...
   
   Con:
   const { recipes, loading } = useRecipes(country);

--loading state:
   if (loading) return <ActivityIndicator />

--WelcomePage deve passare la prop:

<ListaRicette country={country} />

--Dove `country` è lo state che riceve dal globo.
*/