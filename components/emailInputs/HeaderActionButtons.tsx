import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ThemedText } from "../ThemeComponents/ThemedText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ActionButtonsProps {
  onSaveDraft: () => void;
  onSendEmail: () => void;
  onPickImage: () => void;
}

const HeaderActionButtons: React.FC<ActionButtonsProps> = ({
  onSendEmail,
  onPickImage,
}) => {
  const color = useColorScheme();
  const iconColor = color == "dark" ? "#fff" : "#000";
  return (
    <View style={styles.Container}>
      <View>
        <ThemedText>From: nishdesai676@gmail.com</ThemedText>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPickImage}>
          <MaterialIcons name="attachment" size={24} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSendEmail}>
          <MaterialCommunityIcons name="send" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
});

export default HeaderActionButtons;
