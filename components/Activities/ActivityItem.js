import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ActivityCategoriesContext } from "../../store/activityCategoriesContext";
import { Entypo } from "@expo/vector-icons";
import { getFormattedDate } from "../../scripts/dates";

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

  const actCategoriesCtx = useContext(ActivityCategoriesContext);

  let iconSize = 24;
  let categoryIcon = (
    <Entypo
      name="cross"
      size={iconSize}
      color={GlobalStyles.colors.contentBg}
    />
  );

  let category = actCategoriesCtx.actCategories.find(
    (item) => item.id === props.typeId
  );

  switch (category.icon) {
    case "book-open":
      categoryIcon = (
        <FontAwesome5 name="book-open" size={iconSize} color={category.color} />
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
        <FontAwesome5 name="chart-pie" size={iconSize} color={category.color} />
      );
      break;
    case "star":
      categoryIcon = (
        <AntDesign name="star" size={iconSize} color={category.color} />
      );
      break;
  }

  let categoryView = (
    <View style={[styles.categoryContainer]}>
      <Text style={[styles.categoryName, { color: GlobalStyles.colors.text }]}>
        {getFormattedDate(props.date)}
      </Text>
    </View>
  );

  if (props.typeId !== "none") {
    categoryView = (
      <View style={[styles.categoryContainer]}>
        <Text style={[styles.categoryName, { color: category.color }]}>
          {`${category.name}: ${getFormattedDate(props.date)}`}
        </Text>
      </View>
    );
  }

  if (!category) {
    category = actCategoriesCtx.actCategories[0];
  }

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: GlobalStyles.colors.contentBg400 }}
        style={styles.innerContainer}
        onPress={() =>
          navigation.navigate("ActivityDetailsScreen", {
            activityId: props.id,
          })
        }
      >
        <View style={styles.leftSide}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.categoryInfoContainer}>{categoryView}</View>
        </View>
        <View style={styles.rightSide}>
          <View style={styles.icon}>{categoryIcon}</View>
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
    marginHorizontal: 2,
    backgroundColor: GlobalStyles.colors.contentBg,
    borderRadius: GlobalStyles.border.radius,
    overflow: "hidden",
    elevation: GlobalStyles.border.elevation,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  title: {
    paddingVertical: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  leftSide: {
    flex: 1,
    justifyContent: "space-between",
  },
  rightSide: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingLeft: 8,
  },
  displayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyles.colors.contentBg800,
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
  icon: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryContainer: {
    paddingVertical: 2,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.contentBg,
  },
  categoryInfoContainer: { flexDirection: "row" },
});
