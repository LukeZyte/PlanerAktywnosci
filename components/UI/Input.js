import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import TextUI from "./TextUI";

function Input({
  styleLabel,
  label,
  style,
  placeholder,
  placeholderTextColor,
  value,
  onChangeText,
  multiline,
  numberOfLines,
  blurOnSubmit,
}) {
  const [focus, setFocus] = useState(false);
  const { colors, border } = useTheme();

  return (
    <View style={styles.container}>
      <TextUI style={[styles.label, styleLabel]}>{label}</TextUI>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.contentBg100,
            color: colors.text,
            borderColor: colors.contentBg200,
            borderBottomColor: colors.primary,
            borderRadius: border.radius,
          },
          focus && styles.focusInput,
          focus && {
            backgroundColor: colors.bgPrimary200,
            borderColor: colors.primary,
          },
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : colors.contentBg600
        }
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        blurOnSubmit={blurOnSubmit}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      ></TextInput>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.1,
    borderBottomWidth: 3,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginLeft: 4,
    marginBottom: 2,
  },
});
