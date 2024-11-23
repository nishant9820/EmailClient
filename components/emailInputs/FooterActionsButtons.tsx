import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
interface ActionButtonsProps {
  onSaveDraft: () => void;
  onResetField: () => void;
}
const FooterActionsButtons: React.FC<ActionButtonsProps> = ({
  onSaveDraft,
  onResetField,
}) => {
  const color = useColorScheme();

  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={onSaveDraft}>
        <Entypo name="save" size={30} color="#00796b" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onResetField}>
        <MaterialCommunityIcons
          name="delete"
          size={32}
          color={color === "dark" ? "#C54E57" : "#8B0000"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FooterActionsButtons;

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
