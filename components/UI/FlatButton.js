import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View, Platform } from "react-native";
import TextUI from "./TextUI";

function FlatButton({
  style,
  onPress,
  android_ripple,
  children,
  textStyle,
  pressedStyle,
}) {
  const { colors, border } = useTheme();
  const isIOS = Platform.OS === "ios";

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
        style={({ pressed }) => [
          pressed &&
            isIOS &&
            !pressedStyle && { backgroundColor: colors.contentBg400 },
          pressed && isIOS && pressedStyle && pressedStyle,
        ]}
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
