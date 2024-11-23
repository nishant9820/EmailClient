import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemeComponents/ThemedText";
import { ThemedView } from "@/components/ThemeComponents/ThemedView";
import { format, parseISO } from "date-fns";
import UserAvatar from "react-native-user-avatar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ViewHeader from "@/components/viewEmailInputs/ViewHeader";

type Email = {
  subject: string;
  recipient: string;
  body: string;
  name: string;
  timestamp: string;
  id: string;
};

type ViewEmailDetailsRouteProp = RouteProp<
  { ViewEmailDetails: { email: Email } },
  "ViewEmailDetails"
>;

export type RootStackParamList = {
  ViewEmailDetails: { email: Email };
  Sent: undefined;
};

const ViewEmailDetails = () => {
  const route = useRoute<ViewEmailDetailsRouteProp>();

  const { email } = route.params;

  return (
    <ThemedView style={styles.container}>
      <ViewHeader
        id={email.id}
        name={email.name}
        recipient={email.recipient}
        subject={email.subject}
        timestamp={email.timestamp}
        body={email.body}
      />
      <ScrollView style={styles.content}>
        <View style={styles.subjectContainer}>
          <ThemedText style={styles.subject}>{email.subject}</ThemedText>
          <TouchableOpacity style={styles.starButton}>
            <MaterialIcons name="star-border" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.senderInfo}>
          <UserAvatar
            name={email.name.split(" ")[0][0] + email.name.split(" ")[1][0]}
            size={50}
            style={styles.avatar}
          />
          <View style={styles.senderDetails}>
            <View style={styles.nameRow}>
              <ThemedText style={styles.name}>{email.name}</ThemedText>
              <ThemedText style={styles.time}>
                {format(parseISO(email.timestamp), "PPp")}
              </ThemedText>
            </View>
            <ThemedText style={styles.recipient}>{email.recipient}</ThemedText>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <ThemedText style={styles.body}>{email.body}</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },
  subjectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
  },
  subject: {
    fontSize: 20,
    fontWeight: "500",
    flex: 1,
    marginRight: 16,
  },
  starButton: {
    padding: 8,
  },
  senderInfo: {
    flexDirection: "row",
    padding: 16,
    paddingTop: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
  },
  avatar: {
    marginRight: 12,
  },
  senderDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
  recipient: {
    fontSize: 14,
    color: "gray",
  },
  bodyContainer: {
    padding: 16,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: 16,
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  downloadText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#fff",
  },
});

export default ViewEmailDetails;
