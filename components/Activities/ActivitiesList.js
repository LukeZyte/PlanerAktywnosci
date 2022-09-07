import { useContext, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ActivityItem from "./ActivityItem";
import { ActivitiesContext } from "../../store/activitiesContext";
import { GlobalStyles } from "../../constants/styles";
import FlatButton from "../UI/FlatButton";
import { Ionicons } from "@expo/vector-icons";
import FlatIconButton from "../UI/FlatIconButton";

function ActivitiesList() {
  const activitiesCtx = useContext(ActivitiesContext);

  let today = new Date();
  let activeActivitiesNumber = 0;
  let oldActivitiesNumber = 0;
  let activeActivities = activitiesCtx.activities.filter((activity) => {
    return (
      Math.ceil(
        (new Date(activity.date).getTime() - new Date(today).getTime()) /
          (1000 * 3600 * 24)
      ) >= 0
    );
  });
  let oldActivities = activitiesCtx.activities.filter(
    (activity) =>
      Math.ceil(
        (new Date(activity.date).getTime() - new Date(today).getTime()) /
          (1000 * 3600 * 24)
      ) < 0
  );

  const [hideOld, setHideOld] = useState(true);

  let oldActivitiesList = (
    <View style={styles.listContainer}>
      <FlatList
        keyExtractor={(item) => {
          return item.id;
        }}
        data={oldActivities}
        renderItem={(itemData) => {
          return <ActivityItem {...itemData.item} index={itemData.index} />;
        }}
      />
    </View>
  );

  return (
    <>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item, index) => {
            return item.id;
          }}
          data={activeActivities}
          renderItem={(itemData) => {
            return <ActivityItem {...itemData.item} index={itemData.index} />;
          }}
        />
      </View>
      {activeActivities.length === 0 && (
        <Text style={styles.message}>Brak przyszłych aktywności</Text>
      )}
      <View style={styles.flatButton}>
        <FlatIconButton
          style={{ height: 46, overflow: "hidden" }}
          onPress={() => setHideOld((prevState) => !prevState)}
        >
          <View style={styles.flatButtonInner}>
            {hideOld ? (
              <>
                <Ionicons name="chevron-down" size={20} color="black" />
                <Text style={styles.buttonText}>Pokaż zakończone</Text>
              </>
            ) : (
              <>
                <Ionicons name="chevron-up" size={20} color="black" />
                <Text style={styles.buttonText}>Ukryj zakończone</Text>
              </>
            )}
          </View>
        </FlatIconButton>
      </View>
      {!hideOld && oldActivities && oldActivitiesList}
      {!hideOld && oldActivities.length === 0 && (
        <Text style={styles.message}>Brak zakończonych aktywności</Text>
      )}
    </>
  );
}

export default ActivitiesList;

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 0,
    marginVertical: 8,
  },
  flatButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  flatButtonInner: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: "row",
    borderRadius: GlobalStyles.border.radius,
  },
  buttonText: {
    marginLeft: 8,
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    color: GlobalStyles.colors.contentBg600,
    marginBottom: 16,
  },
});
