import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

function Card({ style, children }) {
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
        style,
      ]}
    >
      {children}
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
