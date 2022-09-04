import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";

function EmptyListMessage() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="playlist-remove"
        size={128}
        color={GlobalStyles.colors.contentBg400}
      />
      <Text style={styles.messageText}>
        Wygląda na to, że lista jest pusta!
      </Text>
      <Text style={styles.messageText}>
        Kliknij w wielki zielony przycisk i dodaj nową aktywność!
      </Text>
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
    color: GlobalStyles.colors.contentBg400,
    textAlign: "center",
    fontSize: 16,
  },
});
