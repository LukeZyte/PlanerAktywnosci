import { StyleSheet, Text, View } from "react-native";
import ActivitiesList from "../components/Activities/ActivitiesList";
import Button from "../components/UI/Button";
import { Ionicons } from "@expo/vector-icons";
import { ActivitiesContext } from "../store/activitiesContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import CircleButton from "../components/UI/CircleButton";

function ActivitiesScreen() {
  const activitiesCtx = useContext(ActivitiesContext);
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.activitiesListContainer}>
        <ActivitiesList />
      </View>
      <View style={styles.buttons}>
        <CircleButton
          onPress={() => navigation.navigate("ActivityDetailsScreen")}
        >
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
