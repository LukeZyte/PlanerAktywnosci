import { Alert, StyleSheet, View, Text } from "react-native";
import { ActivitiesContext } from "../store/activitiesContext";
import { useContext, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

function ActivityDetailsScreen(props) {
  const activitiesCtx = useContext(ActivitiesContext);
  const selectedActivityId = props.route.params?.activityId;
  const navigation = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateTest, setDateTest] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !selectedActivityId ? "Dodaj nową aktywność" : activity.title,
    });
  }, [navigation, selectedActivityId]);

  const activity = activitiesCtx.activities.find(
    (item) => item.id === selectedActivityId
  );

  function dateHandler(date) {
    setDateTest(new Date(date).toLocaleDateString());
    setDatePickerVisibility(false);
  }

  let content = "";

  if (selectedActivityId) {
    content = (
      <>
        <View></View>
      </>
    );
  } else {
    content = (
      <View style={styles.test}>
        <Input label="Tytuł" placeholder="Nowa aktywność" />
        <Input
          label="Opis"
          placeholder="Szczegóły aktywności"
          multiline={true}
          blurOnSubmit={true}
        />
        <Button onPress={() => setDatePickerVisibility(true)}>
          Wybierz datę
        </Button>
        <Text>{dateTest}</Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={dateHandler}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </View>
    );
  }

  return <>{content}</>;
}

export default ActivityDetailsScreen;

const styles = StyleSheet.create({
  test: {
    padding: 12,
  },
  multiline: {},
});
