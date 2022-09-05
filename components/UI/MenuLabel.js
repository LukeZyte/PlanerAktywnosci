import { StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function MenuLabel(props) {
  return <Text style={[styles.labelText, props.style]}>{props.children}</Text>;
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
