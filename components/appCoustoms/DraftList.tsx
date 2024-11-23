import React from "react";
import {
  Alert,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import { ThemedText } from "@/components/ThemeComponents/ThemedText";
import {
  Inter_100Thin,
  Inter_800ExtraBold,
  Inter_700Bold,
  useFonts,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import { format, isToday, parseISO } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { removeDraft } from "@/app/store/slices/draftsSlice";

interface Draft {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  name: string;
  status: "Draft" | "Sent";
  timestamp: string;
}

interface DraftListProps {
  drafts: Draft[];
}

type RootStackParamList = {
  SentMailList: undefined;
  Compose: { draft: Draft };
};

const DraftList: React.FC<DraftListProps> = ({ drafts }) => {
  const { width } = Dimensions.get("window");
  const dispatch = useDispatch();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "SentMailList">
    >();

  const [fontsLoaded] = useFonts({
    Inter_800ExtraBold,
    Inter_700Bold,
    Inter_100Thin,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const formatTimestamp = (timestamp: string) => {
    const date = parseISO(timestamp);
    return isToday(date) ? format(date, "hh:mm a") : format(date, "d MMM");
  };

  const handlePress = (draft: Draft) => {
    navigation.navigate("Compose", { draft });
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Draft", "Are you sure you want to delete this draft?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => dispatch(removeDraft(id)),
      },
    ]);
  };

  const showEditDeleteOptions = (draft: Draft) => {
    Alert.alert("Options", "Choose an action:", [
      { text: "Edit", onPress: () => handlePress(draft) },
      {
        text: "Delete",
        onPress: () => handleDelete(draft.id),
        style: "destructive",
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const renderItem = ({ item }: { item: Draft }) => {
    if (!item) return null;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => showEditDeleteOptions(item)}
      >
        <View style={styles.itemContent}>
          <View>
            <UserAvatar
              name={item.name.split(" ")[0][0] + item.name.split(" ")[1][0]}
              size={45}
            />
            <View style={styles.draftBadge}>
              <ThemedText style={styles.draftText}>Draft</ThemedText>
            </View>
          </View>

          <View style={styles.textContainer}>
            <View style={styles.headerRow}>
              <ThemedText style={styles.nameText}>{item.name}</ThemedText>
              <ThemedText style={styles.timestampText}>
                {formatTimestamp(item.timestamp)}
              </ThemedText>
            </View>

            <ThemedText style={styles.subjectText}>
              {item.subject.length > 28
                ? `${item.subject.slice(0, 32)}...`
                : item.subject}
            </ThemedText>

            <ThemedText style={styles.bodyText}>
              {item.body.length > 28
                ? `${item.body.slice(0, 34)}...`
                : item.body}
            </ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={drafts.reverse()}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 10,
    padding: 10,
  },
  itemContent: {
    flexDirection: "row",
    gap: 15,
  },
  draftBadge: {
    backgroundColor: "yellow",
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 15,
    bottom: 12,
    position: "absolute",
  },
  draftText: {
    fontFamily: "Inter_700Bold",
    color: "gray",
    fontSize: 10,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width - 100,
  },
  nameText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 18,
  },
  timestampText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    alignSelf: "flex-end",
    position: "absolute",
    right: 10,
  },
  subjectText: {
    fontFamily: "Inter_700Bold",
    color: "gray",
  },
  bodyText: {
    fontSize: 14,
  },
});

export default DraftList;
