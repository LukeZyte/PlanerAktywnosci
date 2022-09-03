import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function CircleButton(props) {
  return (
    <View style={[styles.circleContainer, props.style]}>
      <Pressable
        onPress={props.onPress}
        android_ripple={{ color: GlobalStyles.colors.primary700 }}
      >
        <Text style={styles.text}>{props.children}</Text>
      </Pressable>
    </View>
  );
}

export default CircleButton;

const styles = StyleSheet.create({
  circleContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: GlobalStyles.border.elevation,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    width: 80,
    height: 80,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    // fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
