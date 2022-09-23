import { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { ThemeContext } from "../../store/themeContext";
import TextUI from "./TextUI";

function Input(props) {
  const [focus, setFocus] = useState(false);
  const themeCtx = useContext(ThemeContext);
  const color = themeCtx.currentTheme.colors;

  return (
    <View style={styles.container}>
      <TextUI style={[styles.label, props.styleLabel]}>{props.label}</TextUI>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: color.contentBg100, color: color.text },
          focus && styles.focusInput,
          focus && {
            backgroundColor: color.bgPrimary200,
            borderColor: color.primary,
          },
          props.style,
        ]}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
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
  input: {
    backgroundColor: GlobalStyles.colors.contentBg200,
    borderRadius: GlobalStyles.border.radius,
    borderWidth: 0.1,
    borderBottomWidth: 3,
    borderBottomColor: GlobalStyles.colors.primary,
    borderColor: GlobalStyles.colors.contentBg200,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 16,
  },
  focusInput: {},
  label: {
    fontSize: 16,
    marginLeft: 4,
    marginBottom: 2,
  },
});
