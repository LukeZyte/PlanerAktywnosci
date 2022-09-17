import { createContext, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import { GlobalStyles, GlobalStylesDark } from "../constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext({
  darkTheme: null,
  currentTheme: {},
  toggleThemeMode: () => {},
});

function ThemeContextProvider(props) {
  const [darkTheme, setDarkTheme] = useState(true);

  const getThemeFromStore = async () => {
    try {
      const value = await AsyncStorage.getItem("@themeKey");
      if (value !== null) {
        if (value === "true") {
          setDarkTheme(true);
        } else {
          setDarkTheme(false);
        }
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  const setThemeStore = async (data) => {
    try {
      await AsyncStorage.setItem("@themeKey", data.toString());
    } catch (error) {
      Alert.alert(error);
    }
  };

  useLayoutEffect(() => {
    getThemeFromStore();
  }, []);

  function toggleThemeMode() {
    setDarkTheme((prevState) => {
      setThemeStore(!prevState);
      return !prevState;
    });
  }

  const value = {
    darkTheme: darkTheme,
    currentTheme: darkTheme ? GlobalStylesDark : GlobalStyles,
    toggleThemeMode: toggleThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
