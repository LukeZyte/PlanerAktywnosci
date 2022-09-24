import { StyleSheet, View } from "react-native";
import ActivitiesList from "../components/Activities/ActivitiesList";
import { Ionicons } from "@expo/vector-icons";
import { ActivitiesContext } from "../store/activitiesContext";
import { useContext, useLayoutEffect } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import CircleButton from "../components/UI/CircleButton";
import EmptyListMessage from "../components/Activities/EmptyListMessage";
import { GlobalStyles } from "../constants/styles";
import { ThemeContext } from "../store/themeContext";
import HeaderButton from "../components/UI/HeaderButton";
import TextUI from "../components/UI/TextUI";

function ActivitiesScreen() {
  const activitiesCtx = useContext(ActivitiesContext);
  const themeCtx = useContext(ThemeContext);
  const navigation = useNavigation();
  const activitiesNumber = activitiesCtx.activities.length;
  const { colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton onPress={themeCtx.toggleThemeMode}>
          <View style={{ padding: 8 }}>
            {themeCtx.darkTheme && (
              <Ionicons
                name="sunny"
                size={24}
                color={colors.headerButtonText}
              />
            )}
            {!themeCtx.darkTheme && (
              <Ionicons name="moon" size={24} color={colors.headerButtonText} />
            )}
          </View>
        </HeaderButton>
      ),
    });
  }, [navigation, themeCtx.toggleThemeMode]);

  return (
    <>
      <View style={styles.activitiesListContainer}>
        {activitiesNumber > 0 && <ActivitiesList />}
        {activitiesNumber === 0 && <EmptyListMessage />}
      </View>
      <View style={[styles.buttons, { backgroundColor: colors.background }]}>
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
    position: "absolute",
    bottom: 0,
    right: 0,
    // height: 120,
    // flexDirection: "row",
    // justifyContent: "flex-end",
    // alignItems: "flex-end",
    margin: 12,
    padding: 4,
    borderRadius: 50,
  },
  circleText: {
    width: 80,
    height: 80,
    textAlign: "center",
    textAlignVertical: "center",
    color: GlobalStyles.colors.text,
  },
});
