import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import TextUI from "./TextUI";

function FlatButton({ style, onPress, android_ripple, children, textStyle }) {
  const { colors, border } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: border.radius,
          borderColor: colors.primary,
          borderWidth: 1,
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        android_ripple={
          android_ripple ? android_ripple : { color: colors.contentBg400 }
        }
      >
        <TextUI style={[styles.text, { color: colors.text }, textStyle]}>
          {children}
        </TextUI>
      </Pressable>
    </View>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    fontWeight: "bold",
  },
});
