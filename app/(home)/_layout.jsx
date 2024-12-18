import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfer"
        options={{
          title: "Transfer",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="money-bill-transfer" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="topup"
        options={{
          title: "Top Up",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="credit-card-plus"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
