import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AboutPage() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 20 }}>
      <View className="px-4 py-6">
        {/* Titolo */}
        <Text className="mb-2 text-3xl font-bold text-gray-900">Ricette dal Mondo</Text>
        <Text className="mb-6 text-base text-gray-600">
          Scopri ricette autentiche da tutto il mondo
        </Text>

        {/* Overview Progetto */}
        <View className="mb-8 rounded-lg bg-blue-50 p-4">
          <Text className="mb-3 text-xl font-bold text-blue-900">📚 Progetto Overview</Text>
          <Text className="text-sm leading-6 text-gray-700">
            Ricette dal Mondo è un'applicazione mobile che permette agli utenti di esplorare ricette
            autentiche provenienti da diversi paesi. L'app integra una mappa globale interattiva 3D
            per visualizzare le origini di ogni ricetta, offrendo un'esperienza immersiva e
            educativa.
          </Text>
        </View>

        {/* Frontend Stack */}
        <View className="mb-8">
          <Text className="mb-4 text-xl font-bold text-gray-900">🎨 Frontend Stack</Text>
          <View className="space-y-3">
            <LibraryItem
              name="React Native"
              version="0.81.5"
              description="Framework per sviluppo mobile cross-platform"
            />
            <LibraryItem
              name="Expo"
              version="54.0.32"
              description="Toolchain per React Native con accesso a API native"
            />
            <LibraryItem name="React" version="19.1.0" description="Libreria UI core" />
            <LibraryItem
              name="Expo Router"
              version="6.0.22"
              description="Navigation basata su file system (file-based routing)"
            />
            <LibraryItem
              name="NativeWind"
              version="latest"
              description="Tailwind CSS per React Native"
            />
            <LibraryItem
              name="React Three Fiber"
              version="9.5.0"
              description="Binding React per Three.js"
            />
            <LibraryItem
              name="Three.js"
              version="0.182.0"
              description="Libreria 3D WebGL per mappa globale interattiva"
            />
            <LibraryItem
              name="React Native Reanimated"
              version="4.1.1"
              description="Animazioni ad alte prestazioni"
            />
            <LibraryItem
              name="React Native WebView"
              version="13.15.0"
              description="Componente WebView per contenuti web"
            />
            <LibraryItem
              name="TypeScript"
              version="5.9.2"
              description="Linguaggio con type safety"
            />
          </View>
        </View>

        {/* Backend Stack */}
        <View className="mb-8 rounded-lg bg-green-50 p-4">
          <Text className="mb-4 text-xl font-bold text-green-900">⚙️ Backend Stack</Text>
          <View className="space-y-2">
            <BackendItem name="Linguaggio" value="Java" />
            <BackendItem name="Framework" value="Spring Boot" />
            <BackendItem name="Database" value="MongoDB" />
            <BackendItem name="Deploy" value="Render" />
            <BackendItem name="Repository" value="Separato" />
          </View>
          <Text className="mt-4 text-xs italic text-gray-600">
            Il backend è gestito in un repository dedicato per una separazione netta delle
            responsabilità (Frontend/Backend separation).
          </Text>
        </View>

        {/* Dev Tools & Standards */}
        <View className="mb-8">
          <Text className="mb-4 text-xl font-bold text-gray-900">🛠️ Dev Tools & Standards</Text>
          <View className="space-y-2">
            <ToolItem name="ESLint" description="Linting" />
            <ToolItem name="Prettier" description="Code formatting" />
            <ToolItem name="Tailwind CSS" description="Utility-first CSS" />
            <ToolItem name="Metro Bundler" description="Bundler React Native" />
          </View>
        </View>

        {/* Timeline del Progetto */}
        <View className="rounded-lg bg-purple-50 p-4">
          <Text className="mb-4 text-xl font-bold text-purple-900">⏱️ Timeline Progetto</Text>
          <Text className="mb-2 text-sm text-gray-700">
            <Text className="font-semibold">Durata totale:</Text> [Aggiungere numero ore/giorni]
          </Text>
          <Text className="mb-4 text-sm text-gray-700">
            <Text className="font-semibold">Team:</Text> Developer(s) frontend + backend
          </Text>
          <View className="border-l-2 border-purple-300 pl-4">
            <TimelineItem phase="Pianificazione" description="Design UI/UX e architettura" />
            <TimelineItem
              phase="Setup Progetto"
              description="Expo, React Native, routing e styling"
            />
            <TimelineItem
              phase="Sviluppo Frontend"
              description="Componenti, logica e integrazione API"
            />
            <TimelineItem
              phase="Implementazione Mappa 3D"
              description="Three.js e visualizzazione globo interattivo"
            />
            <TimelineItem
              phase="Testing & Deploy"
              description="Test, ottimizzazione e deployment"
            />
          </View>
        </View>

        {/* Features Principali */}
        <View className="mb-8 mt-6">
          <Text className="mb-4 text-xl font-bold text-gray-900">✨ Features Principali</Text>
          <FeatureItem text="Mappa globale 3D interattiva" />
          <FeatureItem text="Catalogo ricette per paese" />
          <FeatureItem text="Dettagli ricetta con ingredienti e preparazione" />
          <FeatureItem text="Interfaccia responsive e intuitiva" />
          <FeatureItem text="Integrazione con backend Java/Spring Boot" />
        </View>
      </View>
    </ScrollView>
  );
}

// Componenti Helper
function LibraryItem({
  name,
  version,
  description,
}: {
  name: string;
  version: string;
  description: string;
}) {
  return (
    <View className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <View className="flex-row items-center justify-between">
        <Text className="flex-1 text-sm font-semibold text-gray-900">{name}</Text>
        <Text className="text-xs text-gray-500">{version}</Text>
      </View>
      <Text className="mt-1 text-xs text-gray-600">{description}</Text>
    </View>
  );
}

function BackendItem({ name, value }: { name: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between border-b border-green-100 py-2">
      <Text className="text-sm font-medium text-gray-700">{name}</Text>
      <Text className="text-sm font-semibold text-green-700">{value}</Text>
    </View>
  );
}

function ToolItem({ name, description }: { name: string; description: string }) {
  return (
    <View className="flex-row items-center justify-between rounded-lg bg-gray-50 p-2">
      <Text className="text-sm font-medium text-gray-900">{name}</Text>
      <Text className="text-xs text-gray-500">{description}</Text>
    </View>
  );
}

function TimelineItem({ phase, description }: { phase: string; description: string }) {
  return (
    <View className="mb-4">
      <Text className="text-sm font-bold text-purple-900">{phase}</Text>
      <Text className="text-xs text-gray-600">{description}</Text>
    </View>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <View className="mb-2 flex-row items-center">
      <Text className="mr-3 text-lg text-blue-500">✓</Text>
      <Text className="flex-1 text-sm text-gray-700">{text}</Text>
    </View>
  );
}
