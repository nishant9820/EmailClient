import React, { FC } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { ThemedView } from "../ThemeComponents/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: FC<Props> = ({ value, onChangeText }) => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#000";
  const searchBarColor = colorScheme === "dark" ? "#3B3B3B" : "#fff";

  return (
    <TouchableOpacity activeOpacity={0.9}>
      <ThemedView>
        <View
          style={{
            ...styles.searchBarContainer,
            backgroundColor: searchBarColor,
          }}
        >
          <Ionicons
            name="search"
            size={24}
            color={iconColor}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={{ color: "#888", flex: 1 }}
            placeholder="Search"
            placeholderTextColor={"#888"}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBarContainer: {
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 15,
    zIndex: 1,
  },
});
