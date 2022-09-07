import { Alert, StyleSheet, View, Text, ScrollView } from "react-native";
import { ActivitiesContext } from "../store/activitiesContext";
import { useContext, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { getFormattedDate } from "../scripts/dates";
import FlatButton from "../components/UI/FlatButton";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "../components/UI/Card";
import MenuLabel from "../components/UI/MenuLabel";
import { ActivityCategoriesContext } from "../store/activityCategoriesContext";

function ActivityDetailsScreen(props) {
  const activitiesCtx = useContext(ActivitiesContext);
  const actCategoriesCtx = useContext(ActivityCategoriesContext);
  const selectedActivityId = props.route.params?.activityId;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Szczegóły aktywności",
    });
  }, [navigation, selectedActivityId]);

  const activity = activitiesCtx.activities.find(
    (item) => item.id === selectedActivityId
  );

  let today = new Date();
  let activityDate = new Date(activity.date);
  let oldDate = today.getTime() > activityDate.getTime() + 1000 * 3600 * 24;

  const category = actCategoriesCtx.actCategories.find(
    (item) => item.id === activity.typeId
  );

  function deleteHandler() {
    activitiesCtx.deleteActivity(activity.id);
    navigation.navigate("ActivitiesScreen");
  }
  function editHandler() {
    navigation.navigate("AddActivityScreen", {
      editingId: selectedActivityId,
    });
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ paddingVertical: 12 }}>
            <Text style={styles.title}>{activity.title}</Text>
            <View style={styles.buttons}>
              <FlatButton style={styles.actionButtons} onPress={deleteHandler}>
                <View style={styles.actionInnerButtons}>
                  <MaterialIcons
                    name="delete"
                    size={20}
                    color={GlobalStyles.colors.wrong500}
                  />
                  <Text style={styles.deleteText}>Usuń</Text>
                </View>
              </FlatButton>
              <FlatButton style={styles.actionButtons} onPress={editHandler}>
                <View style={styles.actionInnerButtons}>
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color={GlobalStyles.colors.primary700}
                  />
                  <Text style={styles.editText}>Edytuj aktywność</Text>
                </View>
              </FlatButton>
            </View>
            <Card style={styles.cardStyle}>
              <MenuLabel>Opis</MenuLabel>
              <Text
                style={[
                  styles.description,
                  !activity.description && styles.noDescription,
                ]}
              >
                {activity.description
                  ? activity.description
                  : "Brak dostępnego opisu"}
              </Text>
            </Card>
            <Card style={styles.cardStyle}>
              <MenuLabel>Szczegóły</MenuLabel>
              <View style={styles.detailsContainer}>
                <View style={styles.iconText}>
                  <Ionicons name="calendar" size={20} color="black" />
                  <Text style={styles.detailsText}>Termin:</Text>
                </View>
                <Text
                  style={[
                    styles.detailsElement,
                    oldDate && styles.detailsWarningElement,
                  ]}
                >
                  {getFormattedDate(new Date(activity.date))}
                </Text>
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.iconText}>
                  <Ionicons name="cube" size={20} color="black" />
                  <Text style={styles.detailsText}>Kategoria:</Text>
                </View>
                <Text style={styles.detailsElement}>{category.name}</Text>
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default ActivityDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 42,
    marginHorizontal: 64,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
  cardStyle: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  actionButtons: {
    marginBottom: 0,
  },
  actionInnerButtons: {
    flexDirection: "row",
    borderRadius: GlobalStyles.border.radius,
  },
  editText: {
    marginLeft: 8,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary700,
  },
  deleteText: {
    marginLeft: 8,
    fontWeight: "bold",
    color: GlobalStyles.colors.wrong500,
  },
  card: {
    marginHorizontal: 2,
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: GlobalStyles.colors.contentBg,
    borderRadius: GlobalStyles.border.radius,
    elevation: GlobalStyles.border.elevation,
  },
  description: {
    fontSize: 16,
  },
  noDescription: {
    textAlign: "center",
    color: GlobalStyles.colors.contentBg400,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  iconText: {
    flexDirection: "row",
  },
  detailsText: {
    fontSize: 16,
    marginLeft: 8,
    textAlignVertical: "center",
  },
  detailsElement: {
    fontSize: 16,
    color: GlobalStyles.colors.primary700,
    fontWeight: "bold",
  },
  detailsWarningElement: {
    color: GlobalStyles.colors.wrong500,
  },
});
