import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";

function HeaderButton(props) {
  const { colors, border } = useTheme();

  return (
    <View
      style={[styles.container, { borderRadius: border.radius }, props.style]}
    >
      <Pressable
        onPress={props.onPress}
        android_ripple={{ color: colors.primary900 }}
        style={{ flex: 1 }}
      >
        {props.children}
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
