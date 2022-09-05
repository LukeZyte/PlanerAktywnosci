import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../UI/Button";
import Input from "../UI/Input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useContext, useLayoutEffect, useState } from "react";
import { ActivitiesContext } from "../../store/activitiesContext";
import { Ionicons } from "@expo/vector-icons";
import FlatButton from "../UI/FlatButton";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { getFormattedDate } from "../../scripts/dates";
import FlatIconButton from "../UI/FlatIconButton";
import Card from "../UI/Card";
import MenuLabel from "../UI/MenuLabel";
import CategoriesModal from "../CategoriesModal";

function AddActivity(props) {
  const activitiesCtx = useContext(ActivitiesContext);
  const selectedActivityId = props.selectedActivityId;
  const isEditing = !!selectedActivityId;

  const navigation = useNavigation();

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
              text: "Dodaj",
              onPress: () => {
                activitiesCtx.addActivity({
                  id: Math.random(),
                  title: enteredTitle.value,
                  description: enteredDesc.value,
                  date: date.value,
                });
                navigation.navigate("ActivitiesScreen");
              },
            },
          ]
        );
        return;
      }
      activitiesCtx.addActivity({
        id: Math.random(),
        title: enteredTitle.value,
        description: enteredDesc.value,
        date: date.value,
      });
      navigation.navigate("ActivitiesScreen");
    } else if (formOK && isEditing) {
      if (oldDate) {
        Alert.alert(
          "Zaczekaj!",
          "Wybrano datę z przeszłości dla terminu aktyności. Czy chcesz ją dodać mimo to?",
          [
            {
              text: "Cofnij",
              onPress: () => {
                setDatePickerVisibility(true);
                setDate(new Date());
              },
            },
            {
              text: "Dodaj",
              onPress: () => {
                activitiesCtx.updateActivity(selectedActivityId, {
                  id: activity.id,
                  title: enteredTitle.value,
                  description: enteredDesc.value,
                  date: date.value,
                });
                navigation.navigate("ActivitiesScreen");
              },
            },
          ]
        );
        return;
      }
      activitiesCtx.updateActivity(selectedActivityId, {
        id: activity.id,
        title: enteredTitle.value,
        description: enteredDesc.value,
        date: date.value,
      });
      navigation.navigate("ActivitiesScreen");
    }
  }

  const [isModalVisible, setIsModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
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
        />
      </View>
      <Card style={styles.card}>
        <MenuLabel style={styles.label}>Dostosuj</MenuLabel>
        <FlatIconButton
          onPress={() => setDatePickerVisibility(true)}
          style={{
            flexDirection: "row",
          }}
        >
          <View style={styles.sectionContainer}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="calendar" size={20} color="black" />
              <Text style={styles.calendarButtonText}>
                {!date.choosen ? "Wybierz datę" : "Zmień datę"}
              </Text>
            </View>
            <View style={styles.dateTextContainer}>
              {date.choosen && (
                <Text
                  style={[styles.dateText, oldDate ? styles.oldDateText : null]}
                >
                  {dateText}
                </Text>
              )}
              {!date.choosen && (
                <Text
                  style={[
                    styles.dateMessageText,
                    dateNotChoosen && styles.dateMessageTextInvalid,
                  ]}
                >
                  Nie wprowadzono daty
                </Text>
              )}
            </View>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={dateHandler}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </FlatIconButton>
        <FlatIconButton
          onPress={() => setDatePickerVisibility(true)}
          style={{
            flexDirection: "row",
          }}
        >
          <View style={styles.sectionContainer}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="cube" size={20} color="black" />
              <Text style={styles.calendarButtonText}>
                {!date.choosen ? "Wybierz Kategorię" : "Zmień kategorię"}
              </Text>
            </View>
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateMessageText}>Brak</Text>
            </View>
          </View>
          <CategoriesModal />
        </FlatIconButton>
      </Card>
      <View style={styles.buttons}>
        <FlatButton style={styles.cancelButton} onPress={cancelHandler}>
          <Text>Anuluj</Text>
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
  inputsContainer: {
    marginHorizontal: 12,
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
  dateContainerInvalid: {
    backgroundColor: GlobalStyles.colors.wrong200,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.wrong500,
  },
  dateText: {
    color: GlobalStyles.colors.primary700,
    fontSize: 16,
    fontWeight: "bold",
  },
  oldDateText: {
    color: GlobalStyles.colors.wrong500,
  },
  dateMessageText: {
    color: GlobalStyles.colors.contentBg600,
    fontSize: 16,
    // fontWeight: "bold",
  },
  dateMessageTextInvalid: {
    color: GlobalStyles.colors.wrong500,
    // fontSize: 16,
    fontWeight: "bold",
  },
  calendarButtonText: {
    fontSize: 16,
    textAlignVertical: "center",
    // fontWeightr: "bold",
    marginLeft: 12,
  },
  buttons: {
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  confirmButton: {
    marginLeft: 24,
  },
  cancelButton: {},
});
