import { StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import TextUI from "./TextUI";

function MenuLabel(props) {
  return (
    <TextUI style={[styles.labelText, props.style]}>{props.children}</TextUI>
  );
}

export default MenuLabel;

const styles = StyleSheet.create({
  labelText: {
    fontWeight: "bold",
    // fontSize: 16,
    color: GlobalStyles.colors.primary700,
    marginBottom: 12,
  },
});
