import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { ThemeContext } from "../../store/themeContext";

function FlatIconButton(props) {
  const themeCtx = useContext(ThemeContext);
  const color = themeCtx.currentTheme.colors;

  return (
    <View style={[styles.container, props.style]}>
      <Pressable
        onPress={props.onPress}
        android_ripple={{ color: color.contentBg400 }}
        style={{ flex: 1 }}
      >
        {props.children}
      </Pressable>
    </View>
  );
}

export default FlatIconButton;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: GlobalStyles.border.radius,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 32,
    paddingVertical: 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.text,
  },
});
