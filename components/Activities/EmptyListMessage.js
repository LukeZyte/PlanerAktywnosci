import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import TextUI from "../UI/TextUI";
import { useContext } from "react";
import { ThemeContext } from "../../store/themeContext";

function EmptyListMessage() {
  const themeCtx = useContext(ThemeContext);
  const color = themeCtx.currentTheme.colors;

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="playlist-remove"
        size={128}
        color={color.contentBg400}
      />
      <TextUI style={[styles.messageText, { color: color.contentBg400 }]}>
        Wygląda na to, że lista jest pusta!
      </TextUI>
      <TextUI style={[styles.messageText, { color: color.contentBg400 }]}>
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
