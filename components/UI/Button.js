import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View, Platform } from "react-native";
import TextUI from "../UI/TextUI";

function Button({ style, onPress, children }) {
  const { colors, border } = useTheme();
  const isIOS = Platform.OS === "ios";

  return (
    <View
      style={[
        styles.buttonContainer,
        {
          backgroundColor: colors.primary,
          borderRadius: border.radius,
          elevation: border.elevationBig,
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          { flex: 1 },
          pressed && isIOS && { backgroundColor: colors.primary900 },
        ]}
        android_ripple={{ color: colors.primary900 }}
      >
        <TextUI style={[styles.text, { color: colors.submitButtonText }]}>
          {children}
        </TextUI>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
});
