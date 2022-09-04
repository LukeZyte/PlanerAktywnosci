import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ActivitiesContext } from "../../store/activitiesContext";

function ActivityItem(props) {
  const navigation = useNavigation();

  const activitiesCtx = useContext(ActivitiesContext);

  let isLastItem = props.index === activitiesCtx.activities.length - 1;

  let today = new Date();
  let activityDay = new Date(props.date);
  let daysLeftInMs = activityDay.getTime() - today.getTime();
  let daysLeft = Math.ceil(daysLeftInMs / (1000 * 3600 * 24));
  daysLeft = daysLeft.toString();

  let daysText = "dni";
  if (daysLeft === "0") {
    daysText = "Dzisiaj";
  } else if (daysLeft === "1") {
    daysText = "dzień";
  } else if (daysLeft === "-1") {
    daysText = "Wczoraj";
  } else if (daysLeft < -1) {
    daysText = "dni temu";
  }

  let display = "";
  if (daysLeft === "0" || daysLeft === "-1") {
    display = daysText;
  } else if (daysLeft > 0) {
    display = `${daysLeft} ${daysText}`;
  } else if (daysLeft < -1) {
    display = `${Math.abs(daysLeft)} ${daysText}`;
  }

  return (
    <View
      style={[styles.container, props.style, isLastItem && styles.lastChild]}
    >
      <Pressable
        android_ripple={{ color: GlobalStyles.colors.contentBg400 }}
        style={styles.innerContainer}
        onPress={() =>
          navigation.navigate("ActivityDetailsScreen", { activityId: props.id })
        }
      >
        <View style={styles.leftSide}>
          <Text style={styles.title}>{props.title}</Text>
          {/* <Text style={styles.description}>{props.description}</Text> */}
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.displayTitle}>
            {daysLeft < 0 ? "Zakończono" : "Pozostało"}
          </Text>
          <View style={styles.daysContainer}>
            <Text
              style={[
                styles.displayText,
                daysLeft < 0 ? styles.displayOldText : null,
              ]}
            >
              {display}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default ActivityItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
    backgroundColor: GlobalStyles.colors.contentBg,
    borderRadius: GlobalStyles.border.radius,
    overflow: "hidden",
  },
  innerContainer: {
    flexDirection: "row",
    padding: 8,
  },
  title: {
    paddingVertical: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
  leftSide: {
    flex: 1,
    justifyContent: "center",
  },
  rightSide: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingLeft: 4,
  },
  displayText: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary700,
  },
  displayOldText: {
    color: GlobalStyles.colors.wrong700,
  },
  displayTitle: {
    fontSize: 12,
  },
  daysContainer: {
    flexDirection: "row",
  },
  lastChild: {
    marginBottom: 12,
  },
});
