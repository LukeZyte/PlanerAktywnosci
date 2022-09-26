import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import TextUI from "./TextUI";

function CircleButton(props) {
  const { colors, border } = useTheme();

  return (
    <View
      style={[
        styles.circleContainer,
        { backgroundColor: colors.primary, elevation: border.elevationBig },
        props.style,
      ]}
    >
      <Pressable
        onPress={props.onPress}
        android_ripple={{ color: colors.primary900 }}
      >
        <TextUI style={[styles.text, { color: colors.text }]}>
          {props.children}
        </TextUI>
      </Pressable>
    </View>
  );
}

export default CircleButton;

const styles = StyleSheet.create({
  circleContainer: {
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
