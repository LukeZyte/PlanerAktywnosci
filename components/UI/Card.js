import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Card(props) {
  return <View style={[styles.card, props.style]}>{props.children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 2,
    marginVertical: 4,
    // paddingHorizontal: 16,
    // paddingVertical: 16,
    backgroundColor: GlobalStyles.colors.contentBg,
    borderRadius: GlobalStyles.border.radius,
    elevation: GlobalStyles.border.elevation,
  },
});
