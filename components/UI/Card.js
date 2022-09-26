import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

function Card(props) {
  const { colors, border } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.contentBg100,
          borderRadius: border.radius,
          elevation: border.elevation,
        },
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 2,
    marginVertical: 4,
  },
});
