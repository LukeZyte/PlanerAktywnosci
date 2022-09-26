import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";

function FlatIconButton({ style, onPress, children }) {
  const { colors, border } = useTheme();

  return (
    <View style={[styles.container, { borderRadius: border.radius }, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.contentBg400 }}
        style={{ flex: 1 }}
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
