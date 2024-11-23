import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeDraft, setDrafts } from "../store/slices/draftsSlice";
import { RootState } from "../store";
import { ThemedView } from "@/components/ThemeComponents/ThemedView";
import SearchBar from "@/components/appCoustoms/SearchBar";
import DrawerButton from "@/components/appCoustoms/DrawerButton";
import DraftList from "@/components/appCoustoms/DraftList";
import WelcomeHeader from "@/components/appCoustoms/WelcomeHeader";

const Drafts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const drafts = useSelector((state: RootState) => state.drafts.drafts);
  const [searchTerm, setSearchTerm] = useState("");

  const syncDrafts = async () => {
    try {
      const storedDrafts = await AsyncStorage.getItem("@storage_key");
      if (storedDrafts) dispatch(setDrafts(JSON.parse(storedDrafts)));
    } catch (error) {
      console.error("Error fetching drafts:", error);
    }
  };

  const saveDrafts = async () => {
    try {
      if (drafts.length) {
        await AsyncStorage.setItem("@storage_key", JSON.stringify(drafts));
      }
    } catch (error) {
      console.error("Error saving drafts:", error);
    }
  };

  useEffect(() => {
    syncDrafts();
  }, []);

  useEffect(() => {
    saveDrafts();
  }, [drafts]);

  const filteredDrafts = drafts.filter(({ recipient, subject, body }) =>
    [recipient, subject, body].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.container}>
        <WelcomeHeader />
        <View style={styles.menuSearchContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <DrawerButton />
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <SearchBar value={searchTerm} onChangeText={setSearchTerm} />
          </View>
        </View>
        <DraftList drafts={filteredDrafts} />
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, padding: 20 },
  menuSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    gap: 10,
  },
  searchBar: { width: "84%" },
});

export default Drafts;
