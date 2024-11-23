import React, { FC, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  useColorScheme,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useDispatch, useSelector } from "react-redux";
import { ThemedText } from "@/components/ThemeComponents/ThemedText";
import { ThemedView } from "@/components/ThemeComponents/ThemedView";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RootState, AppDispatch } from "@/app/store";
import { logout } from "@/app/store/slices/authSlice";

const WelcomeHeader: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const skeletonOpacity = new Animated.Value(0.2);

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    await dispatch(logout());
    Alert.alert("Logged Out", "You have been successfully logged out.");
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(skeletonOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(skeletonOpacity, {
          toValue: 0.2,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [skeletonOpacity]);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const colorScheme = useColorScheme();
  const skeletonColor = colorScheme === "dark" ? "#3B3B3B" : "#E0E0E0";
  const moduleColor = colorScheme === "dark" ? "#33363D" : "#fff";
  const iconColor = colorScheme === "dark" ? "#fff" : "#000";

  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <ThemedText>Hello</ThemedText>
        {isLoading ? (
          <Animated.View
            style={[
              styles.skeletonText,
              { opacity: skeletonOpacity, backgroundColor: skeletonColor },
            ]}
          />
        ) : (
          <ThemedText style={styles.name}>
            {user?.email ? "Nishant Desai" : "Guest"}
          </ThemedText>
        )}
      </ThemedView>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {isLoading ? (
          <Animated.View
            style={[
              styles.skeletonAvatar,
              {
                opacity: skeletonOpacity,
                backgroundColor: skeletonColor,
              },
            ]}
          />
        ) : (
          <TouchableOpacity onPress={openModal}>
            <UserAvatar
              style={styles.userAvatar}
              name={user ? "Nishant Desai" : "G"}
              bgColor={"#BBD6B8"}
              size={50}
            />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={{ ...styles.modalView, backgroundColor: moduleColor }}>
            <Pressable
              style={styles.optionRow}
              onPress={() => {
                closeModal();
                handleLogout();
              }}
            >
              <MaterialIcons name="logout" size={24} color={iconColor} />
              <ThemedText style={styles.optionText}>Logout</ThemedText>
            </Pressable>
            <Pressable style={styles.optionRow} onPress={closeModal}>
              <MaterialIcons name="settings" size={24} color={iconColor} />
              <ThemedText style={styles.optionText}>Settings</ThemedText>
            </Pressable>
            <Pressable style={styles.optionRow} onPress={closeModal}>
              <MaterialIcons name="close" size={24} color={iconColor} />
              <ThemedText style={styles.optionText}>Close</ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

export default WelcomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userAvatar: {
    height: 50,
    width: 50,
    marginBottom: 10,
    marginTop: 20,
  },
  skeletonAvatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  skeletonText: {
    width: 100,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
  },
});
