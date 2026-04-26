import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#0044ff',
          tabBarInactiveTintColor: '#000000',
          tabBarStyle: {
            height: 50,
            marginBottom: insets.bottom,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderBlockColor: '#000000',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="information-circle" size={26} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
0;
