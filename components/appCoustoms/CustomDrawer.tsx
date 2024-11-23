import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Alert,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "../ThemeComponents/ThemedText";
import { logout } from "@/app/store/slices/authSlice";
import { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#000";
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    Alert.alert("Logged Out", "You have been successfully logged out.");
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ padding: 20, alignItems: "center" }}>
          <UserAvatar name="ND" size={50} />
          <ThemedText style={{ marginTop: 10, fontSize: 16 }}>
            Nishant Desai
          </ThemedText>
          <Text style={{ color: "gray" }}>nish@gmail.com</Text>
        </View>
        <View style={styles.drawerItem}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.footerItem}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} color={iconColor} />
            <ThemedText style={styles.footerText}>Tell a Friend</ThemedText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => {
            handleLogout();
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} color={iconColor} />
            <ThemedText style={styles.footerText}>Sign Out</ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: "auto",
  },
  drawerItem: {
    marginVertical: 10,
  },
  footerItem: {
    paddingVertical: 15,
  },
  footerText: {
    fontSize: 15,
    marginLeft: 5,
  },
});

export default CustomDrawerContent;
