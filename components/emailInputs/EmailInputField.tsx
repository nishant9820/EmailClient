import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  useColorScheme,
} from "react-native";
import { ThemedText } from "@/components/ThemeComponents/ThemedText";

interface EmailInputFieldProps extends TextInputProps {
  label: string;
  containerStyle?: ViewStyle;
}

const EmailInputField: React.FC<EmailInputFieldProps> = ({
  label,
  value,
  onChangeText,
  multiline = false,
  style,
  containerStyle,
  ...rest
}) => {
  const color = useColorScheme();
  const inputColor = color === "dark" ? "#fff" : "#000";
  return (
    <View style={[styles.inputField, containerStyle]}>
      <ThemedText style={styles.inputPlaceholders}>{label}</ThemedText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        style={[
          styles.textInput,
          multiline && styles.multilineInput,
          style,
          { color: inputColor },
        ]}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    padding: 9,
    borderRadius: 6,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(170, 170, 170, 0.7)",
  },
  inputPlaceholders: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
  textInput: {
    fontSize: 17,
  },
  multilineInput: {
    height: 150,
    textAlignVertical: "top",
  },
});

export default EmailInputField;
