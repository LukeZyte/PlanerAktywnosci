import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { ThemeContext } from "../../store/themeContext";
import TextUI from "./TextUI";

function CircleButton(props) {
  const themeCtx = useContext(ThemeContext);
  const color = themeCtx.currentTheme.colors;

  return (
    <View style={[styles.circleContainer, props.style]}>
      <Pressable
        onPress={props.onPress}
        android_ripple={{ color: color.primary900 }}
      >
        <TextUI style={styles.text}>{props.children}</TextUI>
      </Pressable>
    </View>
  );
}

export default CircleButton;

const styles = StyleSheet.create({
  circleContainer: {
    backgroundColor: GlobalStyles.colors.primary,
    elevation: GlobalStyles.border.elevationBig,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    width: 80,
    height: 80,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    // fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: GlobalStyles.colors.text,
  },
});
