import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View, Platform } from "react-native";
import TextUI from "./TextUI";

function CircleButton({ style, onPress, children }) {
  const { colors, border } = useTheme();
  const isIOS = Platform.OS === "ios";

  return (
    <View
      style={[
        styles.circleContainer,
        { backgroundColor: colors.primary, elevation: border.elevationBig },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed && isIOS && { backgroundColor: colors.primary900 }
        }
        android_ripple={{ color: colors.primary900 }}
      >
        <TextUI style={[styles.text, { color: colors.text }]}>
          {children}
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
