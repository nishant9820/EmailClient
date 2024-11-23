import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemeComponents/ThemedText";
import Entypo from "@expo/vector-icons/Entypo";

interface ImagePreviewProps {
  imageUris: string[];
  setImageUris: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUris,
  setImageUris,
}) => {
  return (
    <View>
      {imageUris.map((uri, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={{ uri }} style={styles.image} />
          <TouchableOpacity
            onPress={() =>
              setImageUris((prevUris) => prevUris.filter((_, i) => i !== index))
            }
            style={styles.deleteIcon}
          >
            <Entypo name="cross" size={18} color="gray" />
          </TouchableOpacity>
          <ThemedText
            style={styles.fileName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {uri.split("/").pop()?.slice(25)}
          </ThemedText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
  },
  deleteIcon: {
    position: "absolute",
    top: -5,
    left: -5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    padding: 5,
    elevation: 3,
  },
  fileName: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },
});

export default ImagePreview;
