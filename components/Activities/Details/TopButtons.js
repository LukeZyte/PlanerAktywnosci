import { StyleSheet, View } from "react-native";
import FlatButton from "../../UI/FlatButton";
import { MaterialIcons } from "@expo/vector-icons";
import TextUI from "../../UI/TextUI";
import { GlobalStyles } from "../../../constants/styles";
import { useContext } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ActivitiesContext } from "../../../store/activitiesContext";

const TopButtons = ({ selectedActivityId, activity }) => {
  const activitiesCtx = useContext(ActivitiesContext);
  const { colors, border } = useTheme();
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
      <FlatButton
        style={[
          styles.actionButtons,
          { borderColor: colors.wrong500, borderRadius: border.round },
        ]}
        android_ripple={{ color: colors.wrong200 }}
        onPress={deleteHandler}
      >
        <View
          style={[styles.actionInnerButtons, { borderRadius: border.radius }]}
        >
          <MaterialIcons name="delete" size={20} color={colors.wrong500} />
          <TextUI style={[styles.deleteText, { color: colors.wrong500 }]}>
            Usuń
          </TextUI>
        </View>
      </FlatButton>
      <FlatButton
        style={[styles.actionButtons, { borderRadius: border.round }]}
        onPress={editHandler}
      >
        <View
          style={[styles.actionInnerButtons, { borderRadius: border.radius }]}
        >
          <MaterialIcons
            name="edit"
            size={20}
            color={GlobalStyles.colors.primary700}
          />
          <TextUI style={[styles.editText, { color: colors.primary700 }]}>
            Edytuj aktywność
          </TextUI>
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
    marginVertical: 8,
  },
  actionButtons: {
    marginBottom: 0,
  },
  actionInnerButtons: {
    flexDirection: "row",
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
