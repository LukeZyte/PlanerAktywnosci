import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ActivitiesContext } from "../store/activitiesContext";
import { ActivityCategoriesContext } from "../store/activityCategoriesContext";
import { useContext, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import TextUI from "../components/UI/TextUI";
import TopButtons from "../components/Activities/Details/TopButtons";
import Description from "../components/Activities/Details/Description";
import DetailsCard from "../components/Activities/Details/DetailsCard";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";

function ActivityDetailsScreen(props) {
  const activitiesCtx = useContext(ActivitiesContext);
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

  // CATEGORYICON //
  const actCategoriesCtx = useContext(ActivityCategoriesContext);

  let iconSize = 32;
  let categoryIcon = null;

  let category = actCategoriesCtx.actCategories.find(
    (item) => item.id === activity.typeId
  );

  if (category) {
    switch (category.icon) {
      case "book-open":
        categoryIcon = (
          <FontAwesome5
            name="book-open"
            size={iconSize}
            color={category.color}
          />
        );
        break;
      case "file":
        categoryIcon = (
          <FontAwesome name="file" size={iconSize} color={category.color} />
        );
        break;
      case "graduation-cap":
        categoryIcon = (
          <FontAwesome5
            name="graduation-cap"
            size={iconSize}
            color={category.color}
          />
        );
        break;
      case "chart-pie":
        categoryIcon = (
          <FontAwesome5
            name="chart-pie"
            size={iconSize}
            color={category.color}
          />
        );
        break;
      case "star":
        categoryIcon = (
          <AntDesign name="star" size={iconSize} color={category.color} />
        );
        break;
    }
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ paddingVertical: 12 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 42,
                marginBottom: 8,
              }}
            >
              {categoryIcon}
            </View>
            <TextUI style={styles.title}>{activity.title}</TextUI>
            <TopButtons
              selectedActivityId={selectedActivityId}
              activity={activity}
            />
            <Description activity={activity} />
            <DetailsCard activity={activity} oldDate={oldDate} />
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
    marginBottom: 42,
    marginHorizontal: 64,
  },
});
