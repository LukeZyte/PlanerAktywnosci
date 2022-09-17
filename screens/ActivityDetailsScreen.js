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
import TextUI from "../components/UI/TextUI";
import { ThemeContext } from "../store/themeContext";

function ActivityDetailsScreen(props) {
  const activitiesCtx = useContext(ActivitiesContext);
  const actCategoriesCtx = useContext(ActivityCategoriesContext);
  const selectedActivityId = props.route.params?.activityId;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Szczegóły aktywności",
    });
  }, [navigation]);

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

  const themeCtx = useContext(ThemeContext);
  const color = themeCtx.currentTheme.colors;

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ paddingVertical: 12 }}>
            <TextUI style={styles.title}>{activity.title}</TextUI>
            <View style={styles.buttons}>
              <FlatButton style={styles.actionButtons} onPress={deleteHandler}>
                <View style={styles.actionInnerButtons}>
                  <MaterialIcons
                    name="delete"
                    size={20}
                    color={color.wrong500}
                  />
                  <TextUI
                    style={[styles.deleteText, { color: color.wrong500 }]}
                  >
                    Usuń
                  </TextUI>
                </View>
              </FlatButton>
              <FlatButton style={styles.actionButtons} onPress={editHandler}>
                <View style={styles.actionInnerButtons}>
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color={GlobalStyles.colors.primary700}
                  />
                  <TextUI style={styles.editText}>Edytuj aktywność</TextUI>
                </View>
              </FlatButton>
            </View>
            <Card style={styles.cardStyle}>
              <MenuLabel>Opis</MenuLabel>
              <TextUI
                style={[
                  styles.description,
                  !activity.description && styles.noDescription,
                ]}
              >
                {activity.description
                  ? activity.description
                  : "Brak dostępnego opisu"}
              </TextUI>
            </Card>
            <Card style={styles.cardStyle}>
              <MenuLabel>Szczegóły</MenuLabel>
              <View style={styles.detailsContainer}>
                <View style={styles.iconText}>
                  <Ionicons name="calendar" size={20} color={color.text} />
                  <TextUI style={styles.detailsText}>Termin:</TextUI>
                </View>
                <TextUI
                  style={[
                    styles.detailsElement,
                    oldDate && { color: color.wrong500 },
                  ]}
                >
                  {getFormattedDate(new Date(activity.date))}
                </TextUI>
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.iconText}>
                  <Ionicons name="cube" size={20} color={color.text} />
                  <TextUI style={styles.detailsText}>Kategoria:</TextUI>
                </View>
                <TextUI style={styles.detailsElement}>{category.name}</TextUI>
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
  },
  card: {
    marginHorizontal: 2,
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: GlobalStyles.colors.background,
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
});
