import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import SearchBar from "@/components/appCoustoms/SearchBar";
import SentMailList from "@/components/appCoustoms/SentMailList";
import { setSentEmails } from "../store/slices/draftsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemeComponents/ThemedView";
import { View } from "react-native";

const SentEmailsScreen = () => {
  const sentEmails = useSelector((state: RootState) => state.drafts.sentEmails);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const syncSentEmails = async () => {
    try {
      const storedSentEmails = await AsyncStorage.getItem(
        "@storage_key_SentMail"
      );
      if (storedSentEmails)
        dispatch(setSentEmails(JSON.parse(storedSentEmails)));
    } catch (error) {
      console.error("Error fetching Sent Emails:", error);
    }
  };

  const saveSentEmails = async () => {
    try {
      if (sentEmails.length) {
        await AsyncStorage.setItem(
          "@storage_key_SentMail",
          JSON.stringify(sentEmails)
        );
      }
    } catch (error) {
      console.error("Error saving Sent Emails:", error);
    }
  };

  useEffect(() => {
    syncSentEmails();
  }, []);

  useEffect(() => {
    saveSentEmails();
  }, [sentEmails]);

  const filterSentEmails = sentEmails
    .filter(({ status }) => status === "Sent")
    .filter(({ recipient, subject, body }) =>
      [recipient, subject, body].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  return (
    <ThemedView style={styles.container}>
      <SearchBar value={searchTerm} onChangeText={setSearchTerm} />
      <View style={styles.ListContainer}>
        <SentMailList sentEmails={filterSentEmails} />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  ListContainer: {
    marginTop: 20,
  },
});

export default SentEmailsScreen;
