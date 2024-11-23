import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import uuid from "react-native-uuid";
import {
  addDraft,
  addSentEmails,
  removeDraft,
} from "../store/slices/draftsSlice"; // Import the removeDraft action
import { ThemedView } from "@/components/ThemeComponents/ThemedView";
import EmailInputField from "@/components/emailInputs/EmailInputField";
import ImagePreview from "@/components/emailInputs/ImagePreview";
import HeaderActionButtons from "@/components/emailInputs/HeaderActionButtons";
import FooterActionsButtons from "@/components/emailInputs/FooterActionsButtons";
import { pickImage } from "@/utilities/imagePicker";
import { sendEmail } from "@/utilities/emailService";

type EmailEditorScreenParams = {
  draft?: {
    id: string; // Make sure to add the id field
    recipient: string;
    subject: string;
    body: string;
    name: string;
  };
};

const EmailEditorScreen = () => {
  const { params } = useRoute<RouteProp<{ params: EmailEditorScreenParams }>>(); // Specify the type for useRoute
  const draft = params?.draft; // Extract the draft from params
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [recipient, setRecipient] = useState(draft?.recipient || "");
  const [subject, setSubject] = useState(draft?.subject || "");
  const [body, setBody] = useState(draft?.body || "");
  const [name, setName] = useState(draft?.name || "");
  const [imageUris, setImageUris] = useState<string[]>([]);

  useEffect(() => {
    if (draft) {
      setRecipient(draft.recipient);
      setSubject(draft.subject);
      setBody(draft.body);
      setName(draft.name);
    }
  }, [draft]);

  const handleSaveDraft = () => {
    dispatch(
      addDraft({
        id: uuid.v4(),
        recipient,
        subject,
        body,
        name,
        status: "Draft",
        timestamp: new Date().toISOString(),
        imageUris,
      })
    );
    resetFields();
    navigation.goBack();
  };

  const handleSendEmail = async () => {
    if (!recipient || !subject || !body || !name) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    try {
      const response = await sendEmail({
        recipient,
        subject,
        body,
        name,
        imageUris,
      });
      if (response.status === 202) {
        dispatch(
          addSentEmails({
            id: uuid.v4(),
            recipient,
            subject,
            body,
            name,
            imageUris,
            status: "Sent",
            timestamp: new Date().toISOString(),
          })
        );
        // Remove the draft after sending the email
        if (draft?.id) {
          dispatch(removeDraft(draft.id)); // Dispatch the action to remove the draft
        }
        Alert.alert("Success", "Email sent successfully!");
        resetFields();
        navigation.goBack();
      } else {
        throw new Error("Failed to send email");
      }
    } catch {
      Alert.alert("Error", "Failed to send email. Please try again.");
    }
  };

  const resetFields = () => {
    setRecipient("");
    setSubject("");
    setBody("");
    setName("");
    setImageUris([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <HeaderActionButtons
          onSaveDraft={handleSaveDraft}
          onSendEmail={handleSendEmail}
          onPickImage={async () => {
            const uri = await pickImage();
            if (uri) setImageUris((prevUris) => [...prevUris, uri]);
          }}
        />
        <EmailInputField
          label="To"
          value={recipient}
          onChangeText={setRecipient}
        />
        <EmailInputField label="Name" value={name} onChangeText={setName} />
        <EmailInputField
          label="Subject"
          value={subject}
          onChangeText={setSubject}
        />
        <EmailInputField
          label="Message"
          value={body}
          onChangeText={setBody}
          multiline
          style={styles.bodyInput}
        />
        <View style={styles.actionRow}>
          <ImagePreview imageUris={imageUris} setImageUris={setImageUris} />
          <FooterActionsButtons
            onSaveDraft={handleSaveDraft}
            onResetField={resetFields}
          />
        </View>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, padding: 20 },
  bodyInput: { height: 150, textAlignVertical: "top" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
});

export default EmailEditorScreen;
