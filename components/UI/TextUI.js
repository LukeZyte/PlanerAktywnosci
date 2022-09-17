import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { ThemeContext } from "../../store/themeContext";

const TextUI = (props) => {
  const { colors } = useTheme();
  const themeCtx = useContext(ThemeContext);
  const color = themeCtx.currentTheme.colors;

  return (
    <Text style={[styles.text, { color: color.text }, props.style]}>
      {props.children}
    </Text>
  );
};

export default TextUI;

const styles = StyleSheet.create({});
