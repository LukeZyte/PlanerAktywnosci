import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import TextUI from "./TextUI";

function MenuLabel({ style, children }) {
  const { colors } = useTheme();
  return (
    <TextUI style={[styles.labelText, { color: colors.primary700 }, style]}>
      {children}
    </TextUI>
  );
}

export default MenuLabel;

const styles = StyleSheet.create({
  labelText: {
    fontWeight: "bold",
    // fontSize: 16,
    marginBottom: 12,
  },
});
