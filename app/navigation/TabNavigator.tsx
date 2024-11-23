import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Home from "@/app/main/index";
import Explore from "@/app/main/explore";
import { useColorScheme } from "@/hooks/useColorScheme";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#3B3B3B" : "#fff";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "dark" ? "#FFFFFF" : "#000000",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: backgroundColor,
          borderRadius: 30,
          position: "absolute",
          borderColor: "transparent",
          elevation: 15,
          height: 54,
          overflow: "hidden",
          bottom: 15,
          margin: "5%",
          width: "90%",
          zIndex: 1,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name={"house.fill"} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={28} name={"paperplane.fill"} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
