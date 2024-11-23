import React from "react";
import {
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

interface SentEmail {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  name: string;
  status: "Draft" | "Sent";
  timestamp: string;
}

interface SentMailListProps {
  sentEmails: SentEmail[];
}
type RootStackParamList = {
  SentMailList: undefined;
  ViewEmailDetails: { email: SentEmail };
};

const SentMailList: React.FC<SentMailListProps> = ({ sentEmails }) => {
  const [fontsLoaded] = useFonts({
    Inter_800ExtraBold,
    Inter_700Bold,
    Inter_100Thin,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return "";
  }

  const formatTimestamp = (timestamp: string) => {
    const date = parseISO(timestamp);

    if (isToday(date)) {
      return format(date, "hh:mm a");
    }

    return format(date, "d MMM");
  };
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "SentMailList">
    >();
  const handlePress = (email: SentEmail) => {
    navigation.navigate("ViewEmailDetails", { email });
  };
  const renderItem = ({ item }: { item: SentEmail }) => {
    if (!item) return null;

    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => handlePress(item)}
      >
        <View style={styles.container}>
          <View>
            <UserAvatar
              name={item.name.split(" ")[0][0] + item.name.split(" ")[1][0]}
              size={45}
            />
            <View style={styles.statusIndicator}>
              <ThemedText style={styles.statusText}>Sent</ThemedText>
            </View>
          </View>

          <View>
            <View style={styles.header}>
              <ThemedText style={styles.nameText}>{item.name}</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.timestampText}>
                {formatTimestamp(item.timestamp)}
              </ThemedText>
            </View>

            <ThemedText style={styles.subjectText}>
              {item.subject.length > 28
                ? item.subject.slice(0, 32) + "..."
                : item.subject}
            </ThemedText>

            <ThemedText style={styles.bodyText}>
              {item.body.length > 28
                ? item.body.slice(0, 34) + "..."
                : item.body}
            </ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={sentEmails.reverse()}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    marginVertical: 10,
    padding: 10,
  },
  container: {
    flexDirection: "row",
    gap: 15,
  },
  statusIndicator: {
    backgroundColor: "green",
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 15,
    bottom: 12,
    position: "absolute",
  },
  statusText: {
    fontFamily: "Inter_700Bold",
    color: "white",
    fontSize: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  nameText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 18,
  },
  timestampText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    alignSelf: "flex-end",
  },
  subjectText: {
    fontFamily: "Inter_700Bold",
    color: "gray",
  },
  bodyText: {
    fontSize: 14,
  },
});

export default SentMailList;
