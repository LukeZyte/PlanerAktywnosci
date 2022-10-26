import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View, Platform } from "react-native";

function FlatIconButton({ style, onPress, children }) {
  const { colors, border } = useTheme();
  const isIOS = Platform.OS === "ios";

  return (
    <View style={[styles.container, { borderRadius: border.radius }, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.contentBg400 }}
        style={({ pressed }) => [
          { flex: 1 },
          pressed && isIOS && { backgroundColor: colors.contentBg400 },
        ]}
      >
        {children}
      </Pressable>
    </View>
  );
}

export default FlatIconButton;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
