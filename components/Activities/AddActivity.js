import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button";
import Input from "../UI/Input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useContext, useState } from "react";
import { ActivitiesContext } from "../../store/activitiesContext";
import { Ionicons } from "@expo/vector-icons";
import FlatButton from "../UI/FlatButton";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { getFormattedDate } from "../../scripts/dates";

function AddActivity() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState({ value: null, choosen: false });

  const activitiesCtx = useContext(ActivitiesContext);
  const navigation = useNavigation();

  function dateHandler(date) {
    setDateNotChoosen(false);
    setDate({
      value: new Date(date).toLocaleDateString(),
      choosen: true,
    });
    setDatePickerVisibility(false);
  }

  let dateText = getFormattedDate(date.value);
  let today = new Date();

  const [enteredTitle, setEnteredTitle] = useState({
    value: "",
    isValid: true,
  });
  const [enteredDesc, setEnteredDesc] = useState({ value: "", isValid: true });
  const [dateNotChoosen, setDateNotChoosen] = useState(false);

  function cancelHandler() {
    navigation.goBack();
  }
  function submitHandler() {
    let titleOK = true;
    let descOK = true;
    let dateOK = true;
    if (
      enteredTitle.value.trim().length === 0 ||
      enteredTitle.value.length > 100
    ) {
      setEnteredTitle({ value: "", isValid: false });
      titleOK = false;
    }
    if (!date.choosen) {
      setDateNotChoosen(true);
      dateOK = false;
    }

    let formOK = titleOK && descOK && dateOK;
    if (formOK) {
      activitiesCtx.addActivity({
        id: Math.random(),
        title: enteredTitle.value,
        description: enteredDesc.value,
        date: date.value,
      });
      navigation.navigate("Activities");
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Input
          style={!enteredTitle.isValid && styles.invalidTitle}
          label="Tytuł"
          placeholder="Nowa aktywność"
          value={enteredTitle.value}
          onChangeText={(enteredTitle) =>
            setEnteredTitle({ value: enteredTitle, isValid: true })
          }
        />
        <Input
          style={!enteredDesc.isValid ? styles.invalidDesc : null}
          label="Opis"
          placeholder="Szczegóły aktywności"
          vlaue={enteredDesc.value}
          onChangeText={(enteredDesc) =>
            setEnteredDesc({ value: enteredDesc, isValid: true })
          }
          multiline={true}
          // blurOnSubmit={true}
        />
        <View
          style={[
            styles.dateContainer,
            dateNotChoosen && styles.dateContainerInvalid,
          ]}
        >
          <View style={styles.dateTextContainer}>
            {date.choosen && (
              <Text
                style={[
                  styles.dateText,
                  new Date(date.value).getTime() + 1000 * 3600 * 24 <
                  new Date(today).getTime()
                    ? styles.oldDateText
                    : null,
                ]}
              >
                {dateText}
              </Text>
            )}
            {!date.choosen && (
              <Text style={styles.dateMessageText}>Nie wprowadzono daty</Text>
            )}
          </View>

          <FlatButton
            style={styles.buttonContainer}
            onPress={() => setDatePickerVisibility(true)}
          >
            <View style={styles.calendarButton}>
              <Ionicons name="calendar" size={24} color="black" />
              <Text style={styles.calendarButtonText}>
                {!date.choosen ? "Wybierz datę" : "Zmień datę"}
              </Text>
            </View>
          </FlatButton>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={dateHandler}
          onCancel={() => setDatePickerVisibility(false)}
        />
        <View style={styles.buttons}>
          <FlatButton style={styles.cancelButton} onPress={cancelHandler}>
            <Text>Anuluj</Text>
          </FlatButton>
          <Button style={styles.confirmButton} onPress={submitHandler}>
            <Text>Dodaj</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default AddActivity;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginTop: 32,
  },
  invalidTitle: {
    backgroundColor: GlobalStyles.colors.wrong200,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.wrong500,
  },
  invalidDesc: {
    backgroundColor: GlobalStyles.colors.wrong200,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.wrong500,
  },
  multiline: {},
  dateContainer: {
    marginTop: 24,
    paddingVertical: 24,
    backgroundColor: GlobalStyles.colors.contentBg,
    borderRadius: GlobalStyles.border.radius,
    elevation: GlobalStyles.border.elevation,
  },
  dateContainerInvalid: {
    backgroundColor: GlobalStyles.colors.wrong200,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.wrong500,
  },
  dateTextContainer: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    color: GlobalStyles.colors.primary700,
    fontSize: 24,
    fontWeight: "bold",
  },
  oldDateText: {
    color: GlobalStyles.colors.wrong700,
  },
  dateMessageText: {
    color: GlobalStyles.colors.contentBg800,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  calendarButton: {
    flexDirection: "row",
    borderRadius: GlobalStyles.border.radius,
  },
  calendarButtonText: {
    fontSize: 16,
    textAlignVertical: "center",
    fontWeight: "bold",
    marginLeft: 12,
  },
  buttons: {
    marginVertical: 48,
    flexDirection: "row",
    justifyContent: "center",
  },
  confirmButton: {
    marginLeft: 24,
  },
  cancelButton: {},
});
