import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { ThemeContext } from "../../store/themeContext";
import TextUI from "../UI/TextUI";

function Button(props) {
  const themeCtx = useContext(ThemeContext);
  const darkTheme = themeCtx.darkTheme;
  const color = themeCtx.currentTheme.colors;

  return (
    <View
      style={[
        styles.buttonContainer,
        { backgroundColor: color.primary },
        props.style,
      ]}
    >
      <Pressable
        onPress={props.onPress}
        android_ripple={{ color: color.primary900 }}
      >
        <TextUI style={styles.text}>{props.children}</TextUI>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: GlobalStyles.border.elevationBig,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: GlobalStyles.border.radius,
  },
  text: {
    color: GlobalStyles.colors.text,
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
});
