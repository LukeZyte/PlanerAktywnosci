import { Alert, StyleSheet, Text, View } from "react-native";
import Button from "../../UI/Button";
import { useContext, useState } from "react";
import { ActivitiesContext } from "../../../store/activitiesContext";
import FlatButton from "../../UI/FlatButton";
import { GlobalStyles } from "../../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { getFormattedDate } from "../../../scripts/dates";
import Card from "../../UI/Card";
import MenuLabel from "../../UI/MenuLabel";
import TextUI from "../../UI/TextUI";
import InputsForm from "./InputsForm";
import DatePickerForm from "./DatePickerForm";
import CategoryPickerForm from "./CategoryPickerForm";

function AddActivity(props) {
  const activitiesCtx = useContext(ActivitiesContext);
  const selectedActivityId = props.selectedActivityId;
  const isEditing = !!selectedActivityId;
  const navigation = useNavigation();

  const activity = activitiesCtx.activities.find(
    (item) => item.id === selectedActivityId
  );

  // INPUTSFORM //
  const [enteredTitle, setEnteredTitle] = useState({
    value: isEditing ? activity.title : "",
    isValid: true,
  });
  const [enteredDesc, setEnteredDesc] = useState({
    value: isEditing ? activity.description : "",
    isValid: true,
  });

  // DATEPICKERFORM //
  const [date, setDate] = useState({
    value: isEditing ? new Date(activity.date) : null,
    choosen: isEditing ? true : false,
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  let dateText = getFormattedDate(date.value);
  let today = new Date();
  let activityDate = new Date(date.value);
  let oldDate = today.getTime() > activityDate.getTime() + 1000 * 3600 * 24;

  // FORM HANDLER //
  function cancelHandler() {
    navigation.goBack();
  }
  function submitHandler() {
    const addActivity = activitiesCtx.addActivity({
      id: Math.random(),
      title: enteredTitle.value,
      description: enteredDesc.value,
      date: date.value,
      typeId: selectedCategoryId,
    });
    const updateActivity = activitiesCtx.updateActivity(selectedActivityId, {
      id: activity.id,
      title: enteredTitle.value,
      description: enteredDesc.value,
      date: date.value,
      typeId: selectedCategoryId,
    });

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
      if (oldDate) {
        Alert.alert(
          "Przedawniony termin!",
          "Wybrano przedawniony termin aktyności. Czy chcesz dodać aktywność mimo to?",
          [
            {
              text: "Cofnij",
              onPress: () => {
                setDatePickerVisibility(true);
                setDate(new Date());
              },
            },
            {
              text: "Potwierdź",
              onPress: () => {
                addActivity;
                navigation.navigate("ActivitiesScreen");
              },
            },
          ]
        );
        return;
      }
      addActivity;
      navigation.navigate("ActivitiesScreen");
    } else if (formOK && isEditing) {
      if (oldDate) {
        Alert.alert(
          "Zaczekaj!",
          "Wybrano datę z przeszłości dla terminu aktyności. Aby na pewno chcesz potwierdzić?",
          [
            {
              text: "Cofnij",
              onPress: () => {
                setDatePickerVisibility(true);
                setDate(new Date());
              },
            },
            {
              text: "Zatwierdź",
              onPress: () => {
                updateActivity;
                navigation.navigate("ActivitiesScreen");
              },
            },
          ]
        );
        return;
      }
      updateActivity;
      navigation.navigate("ActivitiesScreen");
    }
  }

  // CATEGORYPICKERFORM //
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategory);

  let initialCategory = "none";
  if (isEditing) {
    initialCategory = activity.typeId;
  }

  return (
    <View style={styles.container}>
      <InputsForm
        enteredTitle={enteredTitle}
        setEnteredTitle={setEnteredTitle}
        enteredDesc={enteredDesc}
        setEnteredDesc={setEnteredDesc}
      />
      <Card style={styles.card}>
        <MenuLabel style={styles.label}>Dostosuj</MenuLabel>
        <DatePickerForm
          setDate={setDate}
          oldDate={oldDate}
          isDatePickerVisible={isDatePickerVisible}
          setDatePickerVisibility={setDatePickerVisibility}
        />
        <CategoryPickerForm
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </Card>
      <View style={styles.buttons}>
        <FlatButton onPress={cancelHandler}>
          <TextUI>Anuluj</TextUI>
        </FlatButton>
        <Button style={styles.confirmButton} onPress={submitHandler}>
          <Text>{isEditing ? "Zamień" : "Dodaj"}</Text>
        </Button>
      </View>
    </View>
  );
}

export default AddActivity;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  label: {
    paddingHorizontal: 16,
  },
  card: {
    marginTop: 16,
    paddingVertical: 16,
  },
  sectionContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  categoryMessageText: {
    color: GlobalStyles.colors.primary700,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttons: {
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  confirmButton: {
    marginLeft: 24,
  },
});
