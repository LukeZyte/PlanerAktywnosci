import { StyleSheet, Text, View } from "react-native";
import ActivitiesList from "../components/Activities/ActivitiesList";
import { Ionicons } from "@expo/vector-icons";
import { ActivitiesContext } from "../store/activitiesContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import CircleButton from "../components/UI/CircleButton";
import EmptyListMessage from "../components/Activities/EmptyListMessage";

function ActivitiesScreen() {
  const activitiesCtx = useContext(ActivitiesContext);
  const navigation = useNavigation();

  const activitiesNumber = activitiesCtx.activities.length;

  return (
    <>
      <View style={styles.activitiesListContainer}>
        {activitiesNumber > 0 && <ActivitiesList />}
        {activitiesNumber === 0 && <EmptyListMessage />}
      </View>
      <View style={styles.buttons}>
        <CircleButton onPress={() => navigation.navigate("AddActivityScreen")}>
          <Text style={styles.circleText}>
            <Ionicons name="add" size={42} />
          </Text>
        </CircleButton>
      </View>
    </>
  );
}

export default ActivitiesScreen;

const styles = StyleSheet.create({
  activitiesListContainer: {
    flex: 1,
  },
  buttons: {
    height: 120,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 24,
    paddingRight: 24,
  },
  circleText: {
    width: 80,
    height: 80,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
