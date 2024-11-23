// ViewHeader.tsx

import React from "react";
import {
  View,
  TouchableOpacity,
  Alert,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format, parseISO } from "date-fns";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useDispatch } from "react-redux";
import { removeEmail } from "@/app/store/slices/draftsSlice";
import generateEmailHtml from "./emailTemplate"; // Import the HTML generation function

type Email = {
  subject: string;
  recipient: string;
  body: string;
  name: string;
  timestamp: string;
  id: string;
};

export type RootStackParamList = {
  ViewEmailDetails: { email: Email };
  Sent: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ViewEmailDetails"
>;

interface ViewHeaderProps {
  id: string;
  name: string;
  recipient: string;
  subject: string;
  timestamp: string;
  body: string;
}

const ViewHeader = ({
  id,
  name,
  recipient,
  subject,
  timestamp,
  body,
}: ViewHeaderProps) => {
  const color = useColorScheme();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();

  const handleDelete = (id: string) => {
    Alert.alert("Delete Email", "Are you sure you want to delete this Email?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          dispatch(removeEmail(id));
          navigation.navigate("Sent");
        },
      },
    ]);
  };

  const handleDownloadEmail = async () => {
    try {
      const htmlContent = generateEmailHtml(
        recipient,
        subject,
        name,
        format(parseISO(timestamp), "PPpp"),
        body
      );
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert(
          "Sharing not available",
          "Sharing is not supported on this device."
        );
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while generating the PDF.");
    }
  };

  const iconColor = color === "dark" ? "#fff" : "#000";

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Sent")}>
          <MaterialIcons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleDownloadEmail}
          >
            <MaterialIcons name="archive" size={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleDelete(id)}
          >
            <MaterialIcons name="delete" size={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="mail" size={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="more-vert" size={24} color={iconColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default ViewHeader;
