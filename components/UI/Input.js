import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input(props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, props.styleLabel]}>{props.label}</Text>
      <TextInput style={[styles.input, props.style]} {...props} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {},
  input: {
    backgroundColor: GlobalStyles.colors.contentBg200,
    borderRadius: GlobalStyles.border.radius,
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
