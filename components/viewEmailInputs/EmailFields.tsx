import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemeComponents/ThemedText";
import UserAvatar from "react-native-user-avatar";
import { MaterialIcons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";

const EmailFields = ({ email }: { email: any }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <ThemedText style={{ fontSize: 20, fontWeight: "500", flex: 1 }}>
          {email.subject}
        </ThemedText>
        <TouchableOpacity>
          <MaterialIcons name="star-border" size={24} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          padding: 16,
          paddingTop: 8,
          borderBottomWidth: 0.5,
          borderBottomColor: "#e0e0e0",
        }}
      >
        <UserAvatar
          name={email.name.split(" ")[0][0] + email.name.split(" ")[1][0]}
          size={50}
          style={{ marginRight: 12 }}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <ThemedText style={{ fontSize: 16, fontWeight: "500" }}>
              {email.name}
            </ThemedText>
            <ThemedText style={{ fontSize: 12, color: "gray" }}>
              {format(parseISO(email.timestamp), "PPp")}
            </ThemedText>
          </View>
          <ThemedText style={{ fontSize: 14, color: "gray" }}>
            {email.recipient}
          </ThemedText>
        </View>
      </View>

      <View style={{ padding: 16 }}>
        <ThemedText style={{ fontSize: 16, lineHeight: 24 }}>
          {email.body}
        </ThemedText>
      </View>
    </View>
  );
};

export default EmailFields;
