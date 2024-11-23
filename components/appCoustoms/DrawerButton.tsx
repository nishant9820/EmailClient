import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const DrawerButton = () => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#000";
  const containerColor = colorScheme === "dark" ? "#3B3B3B" : "#fff";
  return (
    <View
      style={[styles.menuIconContainer, { backgroundColor: containerColor }]}
    >
      <MaterialIcons name="menu" size={26} color={iconColor} />
    </View>
  );
};

export default DrawerButton;

const styles = StyleSheet.create({
  menuIconContainer: {
    borderRadius: 10,
    height: 56,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
});
