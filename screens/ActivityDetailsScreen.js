import { Alert, StyleSheet, View, Text, ScrollView } from "react-native";
import { ActivitiesContext } from "../store/activitiesContext";
import { useContext, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import AddActivity from "../components/Activities/AddActivity";
import { GlobalStyles } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { getFormattedDate } from "../scripts/dates";

function ActivityDetailsScreen(props) {
  const activitiesCtx = useContext(ActivitiesContext);
  const selectedActivityId = props.route.params?.activityId;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !selectedActivityId
        ? "Dodaj nową aktywność"
        : "Szczegóły aktywności",
    });
  }, [navigation, selectedActivityId]);

  const activity = activitiesCtx.activities.find(
    (item) => item.id === selectedActivityId
  );

  let detailsContent = "";

  if (selectedActivityId) {
    detailsContent = (
      <>
        <View style={styles.container}>
          <ScrollView>
            <View style={{ paddingVertical: 12 }}>
              <Text style={styles.title}>{activity.title}</Text>
              <View style={styles.card}>
                <Text style={styles.label}>Opis</Text>
                <Text style={styles.description}>{activity.description}</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.label}>Szczegóły</Text>
                <View style={styles.detailsContainer}>
                  <View style={styles.iconText}>
                    <Ionicons name="calendar" size={20} color="black" />
                    <Text style={styles.detailsText}>Termin aktywności:</Text>
                  </View>
                  <Text style={styles.detailsElement}>
                    {getFormattedDate(new Date(activity.date))}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }

  return (
    <>
      {!selectedActivityId && <AddActivity />}
      {detailsContent}
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
    marginVertical: 32,
  },
  card: {
    marginHorizontal: 8,
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: GlobalStyles.colors.contentBg,
    borderRadius: GlobalStyles.border.radius,
    elevation: GlobalStyles.border.elevation,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: GlobalStyles.colors.primary700,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
