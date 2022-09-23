import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function HeaderButton(props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, props.style]}>
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
    borderRadius: GlobalStyles.border.radius,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
