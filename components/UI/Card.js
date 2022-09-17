import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles, GlobalStylesDark } from "../../constants/styles";
import { ThemeContext } from "../../store/themeContext";

function Card(props) {
  const themeCtx = useContext(ThemeContext);
  const color = themeCtx.currentTheme.colors;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: color.contentBg100 },
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
    borderRadius: GlobalStyles.border.radius,
    elevation: GlobalStyles.border.elevation,
  },
});
