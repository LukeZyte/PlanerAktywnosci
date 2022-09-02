import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function ActivityItem(props) {
  const navigation = useNavigation();

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
    daysText = "dzień temu";
  } else if (daysLeft < -1) {
    daysText = "dni temu";
  }

  let display = "";
  if (daysLeft === "0") {
    display = daysText;
  } else if (daysLeft > 0) {
    display = `${daysLeft} ${daysText}`;
  } else if (daysLeft < 0) {
    display = `${Math.abs(daysLeft)} ${daysText}`;
  }

  return (
    <View style={[styles.container, props.style]}>
      <Pressable
        android_ripple={{ color: GlobalStyles.colors.contentBg400 }}
        style={styles.innerContainer}
        onPress={() =>
          navigation.navigate("ActivityDetailsScreen", { activityId: props.id })
        }
      >
        <View style={styles.leftSide}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.description}>{props.description}</Text>
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.displayTitle}>
            {daysLeft < 0 ? "Zakończono" : "Pozostało"}
          </Text>
          <View style={styles.daysContainer}>
            <Text style={styles.displayText}>{display}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default ActivityItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    backgroundColor: GlobalStyles.colors.contentBg200,
    borderRadius: GlobalStyles.border.radius,
    overflow: "hidden",
  },
  innerContainer: {
    flexDirection: "row",
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {},
  leftSide: {
    flex: 1,
  },
  rightSide: {
    alignItems: "flex-end",
  },
  displayText: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.contentBg800,
  },
  displayTitle: {},
  daysContainer: {
    flexDirection: "row",
  },
});
