import React from "react";
import { ThemedText } from "@/components/ThemeComponents/ThemedText";
import { ThemedView } from "@/components/ThemeComponents/ThemedView";
import { Colors } from "@/constants/Colors";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setDrafts, setSentEmails } from "../store/slices/draftsSlice";
import { RootState } from "../store";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Compose: undefined;
};

export default function TabTwoScreen() {
  const dispatch = useDispatch();
  const drafts = useSelector((state: RootState) => state.drafts.drafts);
  const sentEmails = useSelector((state: RootState) => state.drafts.sentEmails);
  const clearAllData = async () => {
    try {
      Alert.alert(
        "Confirm Clear Data",
        "Are you sure you want to clear all data? Once cleared, you won't be able to retrieve it.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Proceed",
            style: "destructive",
            onPress: async () => {
              try {
                await AsyncStorage.clear();
                dispatch(setDrafts([]));
                dispatch(setSentEmails([]));
                Alert.alert("Success", "All data has been cleared.");
              } catch (error) {
                console.error("Error clearing all AsyncStorage data:", error);
                Alert.alert("Error", "Failed to clear data. Please try again.");
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error showing clear data alert:", error);
    }
  };
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.header}>Hi Nishant,</ThemedText>
        <ThemedText style={styles.subHeader}>
          Here are a few updates since your last login
        </ThemedText>

        <View style={styles.gridContainer}>
          <View style={styles.cubeContainer}>
            <Text style={styles.cubeTitle}>Sent Emails</Text>
            <Text style={styles.cubeCount}>{sentEmails.length}</Text>
          </View>
          <View style={styles.cubeContainer}>
            <Text style={styles.cubeTitle}>Drafts</Text>
            <Text style={styles.cubeCount}>{drafts.length}</Text>
          </View>
          <View style={styles.cubeContainer}>
            <Text style={styles.cubeTitle}>Today's Meetings</Text>
            <Text style={styles.cubeCount}>3</Text>
          </View>
          <View style={styles.cubeContainer}>
            <Text style={styles.cubeTitle}>Important Emails</Text>
            <Text style={styles.cubeCount}>6</Text>
          </View>
          <View style={styles.cubeContainer}>
            <Text style={styles.cubeTitle}>New Unread Emails</Text>
            <Text style={styles.cubeCount}>21</Text>
            <Text style={styles.totalCount}>
              Total Unread emails in your inbox: 50
            </Text>
          </View>
          <View style={styles.cubeContainer}>
            <Text style={styles.cubeTitle}>Scheduled Emails</Text>
            <Text style={styles.cubeCount}>8</Text>
          </View>
          <View style={styles.cubeContainer}>
            <Text style={styles.cubeTitle}>Newsletters</Text>
            <Text style={styles.cubeCount}>2</Text>
          </View>
          <TouchableOpacity style={styles.cubeContainer} onPress={clearAllData}>
            <Text style={styles.cubeTitle}>Clear Data</Text>
            <Text style={styles.totalCount}>All the data will be cleared</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.secondaryContainer}>
          <TouchableOpacity
            style={styles.cubeContainer}
            onPress={() => navigation.navigate("Compose")}
          >
            <Text style={styles.cubeTitle}>Compose</Text>
            <Text>Email</Text>
          </TouchableOpacity>
          <View style={styles.cubeContainer}>
            <Text style={styles.cubeTitle}>Archived</Text>
            <Text>Email</Text>
          </View>
        </View>
        <View style={styles.bannerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.bannerText}>Connect</Text>
            <Text style={styles.bannerText}>to a better</Text>
            <Text style={styles.bannerText}>World</Text>
          </View>
          <Image
            style={styles.bannerImage}
            source={require("@/assets/images/snow.png")}
          />
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  secondaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    gap: 5,
    width: "100%",
  },
  cubeContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "48%",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
  },
  cubeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  cubeCount: {
    fontSize: 32,
    fontWeight: "bold",
  },
  totalCount: {
    fontSize: 12,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fbedcd",
    height: 150,
    marginTop: 20,
    paddingHorizontal: 15,
    borderRadius: 8, // Adds a subtle rounded edge for better visuals
    elevation: 2, // For a subtle shadow (Android)
    shadowColor: "#000", // For shadow (iOS)
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  textContainer: {
    flex: 1, // Ensures text occupies available space
  },
  bannerText: {
    fontSize: 28, // Slightly smaller for compact and neat text
    color: "#C4A484",
    fontWeight: "bold",
    marginBottom: -5, // Adjust spacing between lines
    textAlign: "left",
  },
  bannerImage: {
    width: 120, // Reduced for proportional size
    height: 120,
    marginRight: 10, // Adds space between the image and text
    resizeMode: "contain", // Ensures the image doesn't distort
  },
});
