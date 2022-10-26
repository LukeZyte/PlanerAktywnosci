import { StyleSheet, Text, View } from "react-native";
import Button from "../../UI/Button";
import { useContext, useState, useLayoutEffect } from "react";
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
import AlertUI from "../../UI/AlertUI";

function AddActivity({ selectedActivityId }) {
  const activitiesCtx = useContext(ActivitiesContext);
  const isEditing = !!selectedActivityId;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
    });
  }, []);

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
  const [showOldDateAlertUI, setShowOldDateAlertUI] = useState(false);
  const [showEditOldDateAlertUI, setShowEditOldDateAlertUI] = useState(false);
  const [showCancelAlertUI, setShowCancelAlertUI] = useState(false);

  function cancelHandler() {
    setShowCancelAlertUI(true);
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
      if (oldDate) {
        setShowOldDateAlertUI(true);
        return;
      }
      activitiesCtx.addActivity({
        id: Math.random(),
        title: enteredTitle.value,
        description: enteredDesc.value,
        date: date.value,
        typeId: selectedCategoryId,
      });
      navigation.navigate("ActivitiesScreen");
    } else if (formOK && isEditing) {
      if (oldDate) {
        setShowEditOldDateAlertUI(true);
        return;
      }
      activitiesCtx.updateActivity(selectedActivityId, {
        id: activity.id,
        title: enteredTitle.value,
        description: enteredDesc.value,
        date: date.value,
        typeId: selectedCategoryId,
      });
      navigation.navigate("ActivitiesScreen");
    }
  }

  // CATEGORYPICKERFORM //
  let initialCategory = null;
  if (isEditing) {
    initialCategory = activity.typeId;
  }

  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategory);

  const goBackHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {showCancelAlertUI && (
        <AlertUI
          onSetModalVisibility={setShowCancelAlertUI}
          onModalVisibility={showCancelAlertUI}
          title={isEditing ? "Anulować edycję?" : "Anulować dodawanie?"}
          message={
            isEditing
              ? "Wybranie opcji Potwierdź spowoduje, że wprowadzone zmiany nie zostaną zapisane."
              : "Wybranie opcji Potwierdź spowoduje, że dodawana aktywność nie zostanie zapisana."
          }
          cancelText="Cofnij"
          confirmText="Potwierdź"
          onConfirm={goBackHandler}
          onCancel={setShowCancelAlertUI}
        />
      )}
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
        {showOldDateAlertUI && (
          <AlertUI
            onSetModalVisibility={setShowOldDateAlertUI}
            onModalVisibility={showOldDateAlertUI}
            title="Przedawniony termin!"
            message="Wybrano przedawniony termin aktyności. Czy chcesz dodać aktywność mimo to?"
            cancelText="Cofnij"
            confirmText="Potwierdź"
            onConfirm={() => {
              navigation.navigate("ActivitiesScreen");
              activitiesCtx.addActivity({
                id: Math.random(),
                title: enteredTitle.value,
                description: enteredDesc.value,
                date: date.value,
                typeId: selectedCategoryId,
              });
            }}
            onCancel={setShowOldDateAlertUI}
          />
        )}
        {showEditOldDateAlertUI && (
          <AlertUI
            onSetModalVisibility={setShowEditOldDateAlertUI}
            onModalVisibility={showEditOldDateAlertUI}
            title="Przedawniony termin!"
            message="Wybrano przedawniony termin aktywności. Czy chcesz edytować aktywność mimo to?"
            cancelText="Cofnij"
            confirmText="Potwierdź"
            onConfirm={() => {
              navigation.navigate("ActivitiesScreen");
              activitiesCtx.updateActivity(selectedActivityId, {
                id: activity.id,
                title: enteredTitle.value,
                description: enteredDesc.value,
                date: date.value,
                typeId: selectedCategoryId,
              });
            }}
            onCancel={setShowEditOldDateAlertUI}
          />
        )}
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
    textAlign: "center",
    marginLeft: 24,
  },
  cancelButton: {
    textAlign: "center",
  },
});
