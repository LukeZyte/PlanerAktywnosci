import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../UI/Card";
import MenuLabel from "../../UI/MenuLabel";
import TextUI from "../../UI/TextUI";
import { ThemeContext } from "../../../store/themeContext";
import { useContext } from "react";
import { getFormattedDate } from "../../../scripts/dates";
import { ActivityCategoriesContext } from "../../../store/activityCategoriesContext";

const DetailsCard = ({ activity, oldDate }) => {
  const themeCtx = useContext(ThemeContext);
  const color = themeCtx.currentTheme.colors;

  const actCategoriesCtx = useContext(ActivityCategoriesContext);
  const category = actCategoriesCtx.actCategories.find(
    (item) => item.id === activity.typeId
  );

  return (
    <Card style={styles.cardStyle}>
      <MenuLabel>Szczegóły</MenuLabel>
      <View style={styles.detailsContainer}>
        <View style={styles.iconText}>
          <Ionicons name="calendar" size={20} color={color.text} />
          <TextUI style={styles.detailsText}>Termin:</TextUI>
        </View>
        <TextUI
          style={[styles.detailsElement, oldDate && { color: color.wrong500 }]}
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
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  cardStyle: {
    paddingHorizontal: 16,
    paddingVertical: 16,
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
