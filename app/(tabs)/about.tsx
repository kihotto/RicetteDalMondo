  import { View, Text, ScrollView } from 'react-native';
  import { useSafeAreaInsets } from 'react-native-safe-area-context';

  export default function AboutPage() {
    const insets = useSafeAreaInsets();

    return (
      <ScrollView
        className="flex-1 bg-black"
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 20 }}>
        <View className="px-4 py-6">

          {/* Titolo */}
          <Text className="mb-2 text-3xl font-bold text-blue-400">Ricette dal Mondo</Text>

          {/* Progetto Overview */}
          <View className="mb-8 rounded-lg border border-blue-950 bg-neutral-950 p-4">
            <Text className="mb-3 text-xl font-bold text-blue-400">Project Overview</Text>
            <Text className="text-sm leading-6 text-blue-300">
              Ricette dal Mondo è un'applicazione mobile pensata per esplorare la
              cultura culinaria globale. Gli utenti
              possono cercare un paese grazie al mappamondo 3D e scopire ricette autentiche
              accedere ai dettagli completi di ogni piatto(ingredienti, dosi e preparazione).
            </Text>
          </View>

          {/* Features */}
          <View className="mb-8 rounded-lg border border-blue-950 bg-neutral-950 p-4">
            <Text className="mb-4 text-xl font-bold text-blue-400">Features Principali</Text>
            <FeatureItem text="Mappa globale 3D interattiva" />
            <FeatureItem text="Catalogo ricette per paese" />
            <FeatureItem text="Dettagli ricetta con ingredienti e preparazione" />
            <FeatureItem text="Interfaccia responsive e intuitiva" />
            <FeatureItem text="Integrazione con backend Java/Spring Boot" />
          </View>

          {/* Timeline */}
          <View className="mb-8 rounded-lg border border-orange-600 bg-neutral-950 p-4">
            <Text className="mb-4 text-xl font-bold text-orange-400">Timeline Progetto</Text>

            {/* Stats */}
            <View className="mb-4 flex-row flex-wrap gap-3 border-orange-600">
              <StatItem label="Durata" value="~2 mesi" />
              <StatItem label="Ore totali" value="~250 h" />
              <StatItem label="Team" value="4 dev" />
              <StatItem label="Modalità" value="Tempo perso" />
            </View>
          </View>

          {/* Fasi */}
            <View className="border-l-2 border-orange-600 pl-4">
              <TimelineItem phase="Pianificazione" description="Design UI/UX e architettura" />
              <TimelineItem phase="Setup Progetto" description="Expo, React Native, routing e styling" />
              <TimelineItem phase="Sviluppo Frontend" description="Componenti, logica e integrazione API" />
              <TimelineItem phase="Mappa 3D" description="Three.js e visualizzazione globo interattivo" />
              <TimelineItem phase="Testing & Deploy" description="Test, ottimizzazione e deployment su Render" />
            </View>
          </View>

          {/* Stack Tecnologico */}
          <View className="mb-8 rounded-lg border border-green-800 bg-neutral-950 p-4">
            <Text className="mb-4 text-xl font-bold text-green-400">Stack Tecnologico</Text>

            {/* Frontend */}
            <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-green-700">
              Frontend
            </Text>
            <View className="space-y-3">
              <LibraryItem name="React Native" version="0.81.5" description="Framework per sviluppo mobile cross-platform" />
              <LibraryItem name="Expo" version="54.0.32" description="Toolchain con accesso a API native" />
              <LibraryItem name="Expo Router" version="6.0.22" description="Navigazione file-based" />
              <LibraryItem name="NativeWind" version="latest" description="Tailwind CSS per React Native" />
              <LibraryItem name="React Three Fiber" version="9.5.0" description="Binding React per Three.js" />
              <LibraryItem name="Three.js" version="0.182.0" description="Rendering 3D WebGL per la mappa globale" />
              <LibraryItem name="React Native Reanimated" version="4.1.1" description="Animazioni ad alte prestazioni" />
              <LibraryItem name="TypeScript" version="5.9.2" description="Type safety e developer experience" />
            </View>

            {/* Backend */}
            <View className="mt-6 border-t border-green-800 pt-4">
              <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-green-700">
                Backend
              </Text>
              <View className="space-y-3">
                <LibraryItem name="Java" version="—" description="Linguaggio backend" />
                <LibraryItem name="Spring Boot" version="—" description="Framework REST API" />
                <LibraryItem name="MongoDB" version="—" description="Database NoSQL per la persistenza dei dati" />
                <LibraryItem name="Render" version="—" description="Piattaforma di deploy cloud" />
              </View>
              <Text className="mt-3 text-xs italic text-green-700">
                Il backend è gestito in un repository dedicato (frontend/backend separation).
              </Text>
            </View>

            {/* Dev Tools */}
            <View className="mt-6 border-t border-green-800 pt-4">
              <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-green-700">
                Dev Tools
              </Text>
              <View className="space-y-2">
                <ToolItem name="Metro Bundler" description="Bundler React Native" />
                <ToolItem name="Tailwind CSS" description="Utility-first styling" />
              </View>
            </View>
          </View>

          {/* Dev Tools */}
            <View className="mt-6 border-t border-green-800 pt-4">
              <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-green-700">
                Dev Tools
              </Text>
              <View className="space-y-2">
                <ToolItem name="Metro Bundler" description="Bundler React Native" />
                <ToolItem name="Tailwind CSS" description="Utility-first styling" />
              </View>
            </View>
          
          {/* Dev Team Bar */}
          <View className="mx-4 mb-4 mt-8 rounded-lg bg-green-900 p-4">
            <Text className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-gray-200">
              Dev Team
            </Text>
            <View className="flex-row justify-around">
              {['Gabriele',  'Libanio', 'Mihajlo', 'Nicola'].map((name) => (
                <Text key={name} className="text-sm font-bold text-white">
                  {name}
                </Text>
              ))}
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
      <View className="rounded-lg border border-green-950 bg-neutral-900 p-3">
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 text-sm font-semibold text-green-400">{name}</Text>
          <Text className="text-xs text-green-700">{version}</Text>
        </View>
        <Text className="mt-1 text-xs text-green-300">{description}</Text>
      </View>
    );
  }

  function ToolItem({ name, description }: { name: string; description: string }) {
    return (
      <View className="flex-row items-center justify-between rounded-lg bg-neutral-900 p-2">
        <Text className="text-sm font-medium text-green-400">{name}</Text>
        <Text className="text-xs text-green-300">{description}</Text>
      </View>
    );
  }

  function StatItem({ label, value }: { label: string; value: string }) {
    return (
      <View
        className="flex-1 rounded-lg border border-orange-600 bg-neutral-900 p-3"
        style={{ minWidth: '40%' }}>
        <Text className="text-xs text-orange-400">{label}</Text>
        <Text className="text-base font-semibold text-orange-300">{value}</Text>
      </View>
    );
  }

  function TimelineItem({ phase, description }: { phase: string; description: string }) {
    return (
      <View className="mb-4">
        <Text className="text-sm font-bold text-orange-400">{phase}</Text>
        <Text className="text-xs text-orange-600">{description}</Text>
      </View>
    );
  }

  function FeatureItem({ text }: { text: string }) {
    return (
      <View className="mb-2 flex-row items-center">
        <View className="mr-3 h-2 w-2 bg-blue-400" />
        <Text className="flex-1 text-sm text-blue-300">{text}</Text>
      </View>
    );
  }