import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ActivitiesScreen from "./screens/ActivitiesScreen";
import ActivityDetailsScreen from "./screens/ActivityDetailsScreen";
import ActivitiesContextProvider from "./store/activitiesContext";
import { GlobalStyles } from "./constants/styles";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "SSPro-regular": require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "SSPro-bold": require("./assets/fonts/SourceSansPro-Bold.ttf"),
    "SSPro-light": require("./assets/fonts/SourceSansPro-Light.ttf"),
    "SSPro-extraLight": require("./assets/fonts/SourceSansPro-ExtraLight.ttf"),
    "SSPro-semiBold": require("./assets/fonts/SourceSansPro-SemiBold.ttf"),
  });

  return (
    <>
      <StatusBar style="light" />
      <ActivitiesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.headerBg },
              headerTintColor: GlobalStyles.colors.headerText,
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen
              name="Activities"
              component={ActivitiesScreen}
              options={{
                headerTitle: "Moje aktywności",
              }}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="ActivityDetailsScreen"
              component={ActivityDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ActivitiesContextProvider>
    </>
  );
}
