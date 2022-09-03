import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function FlatButton(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Pressable
        onPress={props.onPress}
        android_ripple={{ color: GlobalStyles.colors.contentBg400 }}
      >
        <Text style={styles.text}>{props.children}</Text>
      </Pressable>
    </View>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: GlobalStyles.border.radius,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 32,
    paddingVertical: 8,
    fontWeight: "bold",
  },
});
