import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button(props) {
  return (
    <View style={[styles.buttonContainer, props.style]}>
      <Pressable
        onPress={props.onPress}
        android_ripple={{ color: GlobalStyles.colors.primary900 }}
      >
        <Text style={styles.text}>{props.children}</Text>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: GlobalStyles.border.elevation,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: GlobalStyles.border.radius,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
});
