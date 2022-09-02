import { StatusBar, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function HeaderTitle({ title, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
}

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: StatusBar.currentHeight + 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.headerBg,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 32,
    color: GlobalStyles.colors.headerText,
    // fontFamily: "SSPro-bold",
  },
});
