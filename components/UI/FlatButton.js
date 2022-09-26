import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import TextUI from "./TextUI";

function FlatButton(props) {
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
        props.style,
      ]}
    >
      <Pressable
        onPress={props.onPress}
        android_ripple={
          props.android_ripple
            ? props.android_ripple
            : { color: colors.contentBg400 }
        }
      >
        <TextUI style={[styles.text, { color: colors.text }, props.textStyle]}>
          {props.children}
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
