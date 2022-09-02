import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button(props) {
  return (
    <View
      style={[
        props.type === "circle"
          ? styles.circleContainer
          : styles.buttonContainer,
        props.style,
      ]}
    >
      <Pressable
        onPress={props.onPress}
        android_ripple={{ color: GlobalStyles.colors.primary700 }}
      >
        <Text
          style={[
            styles.text,
            props.type === "circle" ? styles.circleText : "",
          ]}
        >
          {props.children}
        </Text>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 8,
    overflow: "hidden",
    borderRadius: GlobalStyles.border.radius,
  },
  circleContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 8,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  circleText: {
    width: 80,
    height: 80,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
