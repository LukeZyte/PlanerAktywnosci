import { Alert, StyleSheet, Text, View } from "react-native";
import Button from "../../UI/Button";
import { useContext, useState } from "react";
import { ActivitiesContext } from "../../../store/activitiesContext";
import FlatButton from "../../UI/FlatButton";
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
  const [dateNotChoosen, setDateNotChoosen] = useState(false);
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
    const addActivity = () => {
      activitiesCtx.addActivity({
        id: Math.random(),
        title: enteredTitle.value,
        description: enteredDesc.value,
        date: date.value,
        typeId: selectedCategoryId,
      });
    };

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
                setDateNotChoosen(true);
                setDatePickerVisibility(true);
                setDate(new Date());
              },
            },
            {
              text: "Potwierdź",
              onPress: () => {
                addActivity();
                navigation.navigate("ActivitiesScreen");
              },
            },
          ]
        );
        return;
      }
      addActivity();
      navigation.navigate("ActivitiesScreen");
    } else if (formOK && isEditing) {
      const updateActivity = () => {
        activitiesCtx.updateActivity(selectedActivityId, {
          id: activity.id,
          title: enteredTitle.value,
          description: enteredDesc.value,
          date: date.value,
          typeId: selectedCategoryId,
        });
      };
      if (oldDate) {
        Alert.alert(
          "Przedawniony termin!",
          "Wybrano przedawniony termin aktyności. Czy chcesz edytować aktywność mimo to?",
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
                updateActivity();
                navigation.navigate("ActivitiesScreen");
              },
            },
          ]
        );
        return;
      }
      updateActivity();
      navigation.navigate("ActivitiesScreen");
    }
  }

  // CATEGORYPICKERFORM //
  let initialCategory = null;
  if (isEditing) {
    initialCategory = activity.typeId;
  }

  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategory);

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
          date={date}
          setDate={setDate}
          dateNotChoosen={dateNotChoosen}
          setDateNotChoosen={setDateNotChoosen}
          oldDate={oldDate}
          isDatePickerVisible={isDatePickerVisible}
          setDatePickerVisibility={setDatePickerVisibility}
        />
        <CategoryPickerForm
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </Card>
      <View style={styles.buttonsContainer}>
        <FlatButton onPress={cancelHandler} style={styles.cancelButton}>
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
  buttonsContainer: {
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  confirmButton: {
    width: 120,
    textAlign: "center",
    marginLeft: 24,
  },
  cancelButton: {
    width: 120,
    textAlign: "center",
  },
});
