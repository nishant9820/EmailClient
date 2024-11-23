import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  useColorScheme,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { ThemedView } from "@/components/ThemeComponents/ThemedView";
import { ThemedText } from "@/components/ThemeComponents/ThemedText";
import { Colors } from "@/constants/Colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";

type RootParamList = {
  Home: undefined;
  Login: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<RootParamList, "Login">;
interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    const isSuccess = await dispatch(login(email, password) as any);
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      Alert.alert("Invalid Credentials", "Please try again.");
    }
  };
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#000";
  const buttonColor =
    colorScheme === "dark" ? Colors.primary : Colors.secondary;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.inputContainer}>
        <FontAwesome
          name="opencart"
          size={90}
          color={iconColor}
          style={{ marginBottom: 65 }}
        />
        <ThemedText style={styles.title}>Sign-in</ThemedText>
        <ThemedText style={{ alignSelf: "flex-start" }}>Email</ThemedText>

        <TextInput
          placeholder="123@gmail.com"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <ThemedText style={{ alignSelf: "flex-start" }}>Password</ThemedText>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="*******"
            placeholderTextColor="#888"
            secureTextEntry={!passwordVisible}
            style={{ width: "80%", color: "#888" }}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible((prevState) => !prevState)} // Toggle password visibility
            //   style={styles.eyeIcon}
          >
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"} // Toggle between eye and eye-off
              size={24}
              color={iconColor}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: buttonColor }}
          onPress={handleLogin}
        >
          <ThemedText>Submit</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#888",
  },
  button: {
    padding: 10,
    margin: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
  },
  passwordContainer: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eyeIcon: {
    right: 10,
  },
});

export default LoginScreen;
