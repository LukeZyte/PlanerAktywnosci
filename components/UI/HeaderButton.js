import { useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { Pressable, StyleSheet, View, Platform } from "react-native";
import { ThemeContext } from "../../store/themeContext";

function HeaderButton({ style, onPress, children }) {
  const { colors, border } = useTheme();
  const isIOS = Platform.OS === "ios";
  const { darkTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { borderRadius: border.round }, style]}>
      <Pressable
        onPress={onPress}
        android_ripple={
          darkTheme
            ? { color: colors.contentBg400 }
            : { color: colors.primary900 }
        }
        style={({ pressed }) => [
          { flex: 1 },
          pressed &&
            !darkTheme &&
            isIOS && { backgroundColor: colors.primary900 },
          pressed &&
            darkTheme &&
            isIOS && { backgroundColor: colors.contentBg400 },
        ]}
      >
        {children}
      </Pressable>
    </View>
  );
}

export default HeaderButton;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
