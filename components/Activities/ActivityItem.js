import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ActivityCategoriesContext } from "../../store/activityCategoriesContext";
import { getSimpleDate } from "../../scripts/dates";
import TextUI from "../UI/TextUI";

function ActivityItem(props) {
  const navigation = useNavigation();

  const { colors, border } = useTheme();

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
  let categoryIcon = <View style={{ height: iconSize }}></View>;

  let category = actCategoriesCtx.actCategories.find(
    (item) => item.id === props.typeId
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

  let categoryView = (
    <View style={[styles.categoryContainer]}>
      <TextUI style={styles.categoryName}>{getSimpleDate(props.date)}</TextUI>
    </View>
  );

  if (category) {
    categoryView = (
      <View style={[styles.categoryContainer]}>
        <TextUI style={[styles.categoryName, { color: category.color }]}>
          {`${category.name}: ${getSimpleDate(props.date)}`}
        </TextUI>
      </View>
    );
  }

  if (!category) {
    category = actCategoriesCtx.actCategories[0];
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.contentBg100,
          borderRadius: border.radius,
          elevation: border.elevation,
        },
      ]}
    >
      <Pressable
        android_ripple={{ color: colors.contentBg400 }}
        style={styles.innerContainer}
        onPress={() =>
          navigation.navigate("ActivityDetailsScreen", {
            activityId: props.id,
          })
        }
      >
        <View style={styles.leftSide}>
          <TextUI style={[styles.title, props.titleStyle]}>
            {props.title}
          </TextUI>
          <View style={styles.categoryInfoContainer}>{categoryView}</View>
        </View>
        <View style={styles.rightSide}>
          <View style={styles.icon}>{categoryIcon}</View>
          <TextUI style={styles.displayTitle}>
            {daysLeft < 0 ? "Zakończono" : "Pozostało"}
          </TextUI>
          <View style={styles.daysContainer}>
            <TextUI
              style={[
                styles.displayText,
                { color: colors.contentBg800 },
                daysLeft < 0 ? { color: colors.wrong700 } : null,
              ]}
            >
              {display}
            </TextUI>
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
    overflow: "hidden",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  title: {
    paddingVertical: 8,
    fontSize: 18,
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
  },
  categoryInfoContainer: {
    flexDirection: "row",
  },
});
