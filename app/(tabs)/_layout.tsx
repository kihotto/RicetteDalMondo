import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#315eda',
          tabBarInactiveTintColor: '#1d45b4',
          tabBarStyle: {
            height: 50,
            marginBottom: insets.bottom,
            alignItems: 'center',
            justifyContent: 'center',
            /* backgroundColor: '#93c5fd', */

            backgroundColor: '#80ff80',
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
              <Ionicons name="information-circle" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
