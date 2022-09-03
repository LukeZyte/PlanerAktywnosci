import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input(props) {
  const [focus, setFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, props.styleLabel]}>{props.label}</Text>
      <TextInput
        style={[styles.input, focus && styles.focusInput, props.style]}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        multiline={props.multiline}
        blurOnSubmit={props.blurOnSubmit}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      ></TextInput>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {},
  innerContainer: {
    // padding: 3,
    // backgroundColor: GlobalStyles.colors.primary500,
    // borderWidth: 3,
    // borderColor: "rgba(0, 0, 0, 0)",
    // borderBottomColor: ,
  },
  input: {
    backgroundColor: GlobalStyles.colors.contentBg200,
    borderRadius: GlobalStyles.border.radius,
    outlineColor: "#523009",
    outlineStyle: "solid",
    outlineWidth: 4,
    // borderWidth: 3,
    // borderRightWidth: 3,
    // borderLeftWidth: 3,
    // borderBottomWidth: 3,
    // borderBottomColor: GlobalStyles.colors.primary500,
    borderColor: GlobalStyles.colors.contentBg200,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 16,
  },
  focusInput: {
    backgroundColor: GlobalStyles.colors.bgPrimary200,
  },
  label: {
    fontSize: 16,
    marginLeft: 4,
    marginBottom: 2,
  },
});
