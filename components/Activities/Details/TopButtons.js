import { StyleSheet, View } from "react-native";
import FlatButton from "../../UI/FlatButton";
import { MaterialIcons } from "@expo/vector-icons";
import TextUI from "../../UI/TextUI";
import { GlobalStyles } from "../../../constants/styles";
import { ThemeContext } from "../../../store/themeContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivitiesContext } from "../../../store/activitiesContext";

const TopButtons = ({ selectedActivityId, activity }) => {
  const activitiesCtx = useContext(ActivitiesContext);
  const themeCtx = useContext(ThemeContext);
  const color = themeCtx.currentTheme.colors;
  const navigation = useNavigation();

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
    <View style={styles.buttons}>
      <FlatButton style={styles.actionButtons} onPress={deleteHandler}>
        <View style={styles.actionInnerButtons}>
          <MaterialIcons name="delete" size={20} color={color.wrong500} />
          <TextUI style={[styles.deleteText, { color: color.wrong500 }]}>
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
  );
};

export default TopButtons;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
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
});
