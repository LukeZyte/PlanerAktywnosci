import { View } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import Input from "../../UI/Input";

const InputsForm = ({
  enteredTitle,
  setEnteredTitle,
  enteredDesc,
  setEnteredDesc,
}) => {
  return (
    <View style={styles.inputsContainer}>
      <Input
        style={
          !enteredTitle.isValid && {
            backgroundColor: color.wrong200,
            borderWidth: 1,
            borderColor: color.wrong500,
          }
        }
        label="Tytuł"
        placeholder="Nowa aktywność"
        value={enteredTitle.value}
        onChangeText={(enteredTitle) =>
          setEnteredTitle({ value: enteredTitle, isValid: true })
        }
      />
      <Input
        style={[
          styles.descInput,
          !enteredDesc.isValid ? styles.invalidDesc : null,
        ]}
        label="Opis"
        numberOfLines={4}
        placeholder="Szczegóły aktywności"
        value={enteredDesc.value}
        onChangeText={(enteredDesc) =>
          setEnteredDesc({ value: enteredDesc, isValid: true })
        }
        multiline={true}
      />
    </View>
  );
};

export default InputsForm;

const styles = StyleSheet.create({
  inputsContainer: {
    marginHorizontal: 12,
  },
  invalidDesc: {
    backgroundColor: GlobalStyles.colors.wrong200,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.wrong500,
  },
  descInput: {
    textAlignVertical: "top",
  },
});
