import { StyleSheet, Text, View } from "react-native";

function Title({ style, children }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{children}</Text>
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
