import { StyleSheet, Text, View } from "react-native";
import TextUI from "./TextUI";

function Title({ style, children }) {
  return (
    <View style={[styles.container, style]}>
      <TextUI style={styles.text}>{children}</TextUI>
    </View>
  );
}

export default Title;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "orange",
  },
  text: {
    // fontFamily: "SSPro-regular",
    fontSize: 18,
  },
});
