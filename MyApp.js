import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ActivitiesScreen from "./screens/ActivitiesScreen";
import ActivityDetailsScreen from "./screens/ActivityDetailsScreen";
import { GlobalStyles } from "./constants/styles";
import AddActivityScreen from "./screens/AddActivityScreen";
import { ThemeContext } from "./store/themeContext";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
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
              backgroundColor: GlobalStyles.colors.headerBg,
            },
            headerTintColor: GlobalStyles.colors.headerText,
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen
            name="ActivitiesScreen"
            component={ActivitiesScreen}
            options={{
              headerTitle: "Moje aktywności",
            }}
          />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
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