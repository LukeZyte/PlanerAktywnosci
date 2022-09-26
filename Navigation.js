import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivitiesScreen from "./screens/ActivitiesScreen";
import ActivityDetailsScreen from "./screens/ActivityDetailsScreen";
import AddActivityScreen from "./screens/AddActivityScreen";
import { ThemeContext } from "./store/themeContext";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [fontsLoaded] = useFonts({
    "SSPro-regular": require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "SSPro-bold": require("./assets/fonts/SourceSansPro-Bold.ttf"),
    "SSPro-light": require("./assets/fonts/SourceSansPro-Light.ttf"),
    "SSPro-extraLight": require("./assets/fonts/SourceSansPro-ExtraLight.ttf"),
    "SSPro-semiBold": require("./assets/fonts/SourceSansPro-SemiBold.ttf"),
  });

  const { currentTheme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer theme={currentTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: currentTheme.colors.headerBg,
            },
            headerTintColor: currentTheme.colors.headerText,
          }}
        >
          <Stack.Screen
            name="ActivitiesScreen"
            component={ActivitiesScreen}
            options={{
              headerTitle: "Moje aktywności",
            }}
          />
          <Stack.Screen
            name="ActivityDetailsScreen"
            component={ActivityDetailsScreen}
          />
          <Stack.Screen
            name="AddActivityScreen"
            component={AddActivityScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
