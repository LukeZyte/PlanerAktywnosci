import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import Input from "../../UI/Input";

const InputsForm = ({
  enteredTitle,
  setEnteredTitle,
  enteredDesc,
  setEnteredDesc,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.inputsContainer}>
      <Input
        style={
          !enteredTitle.isValid && {
            backgroundColor: colors.wrong200,
            borderWidth: 1,
            borderColor: colors.wrong500,
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
          !enteredDesc.isValid
            ? (styles.invalidDesc,
              {
                backgroundColor: colors.wrong200,
                borderColor: colors.wrong500,
              })
            : null,
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
    borderWidth: 1,
  },
  descInput: {
    textAlignVertical: "top",
  },
});
