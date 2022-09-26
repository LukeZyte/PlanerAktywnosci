import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextUI from "../UI/TextUI";
import { useTheme } from "@react-navigation/native";

function EmptyListMessage() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="playlist-remove"
        size={128}
        color={colors.contentBg400}
      />
      <TextUI style={[styles.messageText, { color: colors.contentBg400 }]}>
        Wygląda na to, że lista jest pusta!
      </TextUI>
      <TextUI style={[styles.messageText, { color: colors.contentBg400 }]}>
        Kliknij w wielki zielony przycisk i dodaj nową aktywność!
      </TextUI>
    </View>
  );
}

export default EmptyListMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    textAlign: "center",
    fontSize: 16,
  },
});
