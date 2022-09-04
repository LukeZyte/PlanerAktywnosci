import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useContext, useLayoutEffect, useState } from "react";
import { ActivitiesContext } from "../store/activitiesContext";
import { Ionicons } from "@expo/vector-icons";
import FlatButton from "../components/UI/FlatButton";
import { GlobalStyles } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { getFormattedDate } from "../scripts/dates";
import FlatIconButton from "../components/UI/FlatIconButton";

function AddActivityScreen(props) {
  const selectedActivityId = props.route.params?.editingId;
  const isEditing = !!selectedActivityId;
  const activitiesCtx = useContext(ActivitiesContext);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !isEditing ? "Dodaj nową aktywność" : "Edycja aktywności",
    });
  }, [navigation]);

  const activity = activitiesCtx.activities.find(
    (item) => item.id === selectedActivityId
  );

  const [enteredTitle, setEnteredTitle] = useState({
    value: isEditing ? activity.title : "",
    isValid: true,
  });
  const [enteredDesc, setEnteredDesc] = useState({
    value: isEditing ? activity.description : "",
    isValid: true,
  });
  const [dateNotChoosen, setDateNotChoosen] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState({
    value: isEditing ? new Date(activity.date) : null,
    choosen: isEditing ? true : false,
  });

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
  let activityDate = new Date(date.value);
  let oldDate = today.getTime() > activityDate.getTime() + 1000 * 3600 * 24;

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
    if (formOK && !isEditing) {
      activitiesCtx.addActivity({
        id: Math.random(),
        title: enteredTitle.value,
        description: enteredDesc.value,
        date: date.value,
      });
      navigation.navigate("ActivitiesScreen");
    } else if (formOK && isEditing) {
      activitiesCtx.updateActivity(selectedActivityId, {
        id: activity.id,
        title: enteredTitle.value,
        description: enteredDesc.value,
        date: date.value,
      });
      navigation.navigate("ActivitiesScreen");
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
                style={[styles.dateText, oldDate ? styles.oldDateText : null]}
              >
                {dateText}
              </Text>
            )}
            {!date.choosen && (
              <Text style={styles.dateMessageText}>Nie wprowadzono daty</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <FlatIconButton onPress={() => setDatePickerVisibility(true)}>
              <View style={styles.calendarButton}>
                <Ionicons name="calendar" size={24} color="black" />
                <Text style={styles.calendarButtonText}>
                  {!date.choosen ? "Wybierz datę" : "Zmień datę"}
                </Text>
              </View>
            </FlatIconButton>
          </View>
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
            <Text>{isEditing ? "Zamień" : "Dodaj"}</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default AddActivityScreen;

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
  descInput: {
    textAlignVertical: "top",
  },
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
    color: GlobalStyles.colors.wrong500,
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
    paddingHorizontal: 24,
    paddingVertical: 12,
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
