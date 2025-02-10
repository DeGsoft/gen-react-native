import { getLocalizedText } from '@/languages/languages';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: getLocalizedText('index'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: getLocalizedText('orders'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'apps' : 'apps-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: getLocalizedText('products'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="customer"
        options={{
          title: getLocalizedText('customers'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
