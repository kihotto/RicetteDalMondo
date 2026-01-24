import { Tabs } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <Tabs screenOptions={{ tabBarActiveTintColor: '#b92a2a', headerShown: false }}>
          <Tabs.Screen name="index" options={{ title: 'Home' }} />
          <Tabs.Screen name="about" options={{ title: 'About' }} />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
