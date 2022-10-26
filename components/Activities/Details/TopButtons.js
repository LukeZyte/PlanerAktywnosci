import { StyleSheet, View } from "react-native";
import FlatButton from "../../UI/FlatButton";
import { MaterialIcons } from "@expo/vector-icons";
import TextUI from "../../UI/TextUI";
import { GlobalStyles } from "../../../constants/styles";
import { useContext, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ActivitiesContext } from "../../../store/activitiesContext";
import AlertUI from "../../UI/AlertUI";

const TopButtons = ({ selectedActivityId, activity }) => {
  const activitiesCtx = useContext(ActivitiesContext);
  const { colors, border } = useTheme();
  const navigation = useNavigation();
  const [showDeleteAlertUI, setShowDeleteAlertUI] = useState(false);

  function deleteHandler() {
    setShowDeleteAlertUI(true);
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
        pressedStyle={{ backgroundColor: colors.wrong200 }}
        onPress={deleteHandler}
      >
        <View
          style={[styles.actionInnerButtons, { borderRadius: border.radius }]}
        >
          <MaterialIcons name="delete" size={20} color={colors.wrong500} />
          <TextUI style={[styles.deleteText, { color: colors.text }]}>
            Usuń
          </TextUI>
        </View>
      </FlatButton>
      <FlatButton
        style={[styles.actionButtons, { borderRadius: border.round }]}
        android_ripple={{ color: colors.bgPrimary200 }}
        pressedStyle={{ backgroundColor: colors.bgPrimary200 }}
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
          <TextUI style={[styles.editText, { color: colors.text }]}>
            Edytuj aktywność
          </TextUI>
        </View>
      </FlatButton>
      {showDeleteAlertUI && (
        <AlertUI
          onSetModalVisibility={setShowDeleteAlertUI}
          onModalVisibility={showDeleteAlertUI}
          title={`Usunąć aktywność "${activity.title}"?`}
          message="Tej operacji nie da się cofnąć."
          cancelText="Anuluj"
          confirmText="Usuń"
          onConfirm={() => {
            navigation.navigate("ActivitiesScreen");
            activitiesCtx.deleteActivity(activity.id);
          }}
          onCancel={setShowDeleteAlertUI}
        />
      )}
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
  },
  deleteText: {
    marginLeft: 8,
    fontWeight: "bold",
  },
});
