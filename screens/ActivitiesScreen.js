import { Alert, StyleSheet, Text, View, ScrollView } from "react-native";
import ActivitiesList from "../components/Activities/ActivitiesList";
import { Ionicons } from "@expo/vector-icons";
import { ActivitiesContext } from "../store/activitiesContext";
import { useContext, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import CircleButton from "../components/UI/CircleButton";
import EmptyListMessage from "../components/Activities/EmptyListMessage";
import { GlobalStyles } from "../constants/styles";
import { ThemeContext } from "../store/themeContext";
import HeaderButton from "../components/UI/FlatButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextUI from "../components/UI/TextUI";

function ActivitiesScreen() {
  const activitiesCtx = useContext(ActivitiesContext);
  const themeCtx = useContext(ThemeContext);
  const navigation = useNavigation();
  const activitiesNumber = activitiesCtx.activities.length;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton onPress={themeCtx.toggleThemeMode}>
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={30}
            color="white"
          />
        </HeaderButton>
      ),
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.activitiesListContainer}>
        {activitiesNumber > 0 && <ActivitiesList />}
        {activitiesNumber === 0 && <EmptyListMessage />}
      </View>
      <View style={styles.buttons}>
        <CircleButton onPress={() => navigation.navigate("AddActivityScreen")}>
          <TextUI style={styles.circleText}>
            <Ionicons name="add" size={42} />
          </TextUI>
        </CircleButton>
      </View>
    </>
  );
}

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
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
    color: GlobalStyles.colors.text,
  },
});

// const darkStyles = StyleSheet.create({
//   activitiesListContainer: {
//     backgroundColor: GlobalStylesDark.colors.background,
//   },
//   buttons: {
//     height: 120,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: "flex-end",
//     paddingBottom: 24,
//     paddingRight: 24,
//   },
//   circleText: {
//     width: 80,
//     height: 80,
//     textAlign: "center",
//     textAlignVertical: "center",
//     color: GlobalStyles.colors.text,
//   },
// });
