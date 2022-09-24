import { Alert, StyleSheet, View } from "react-native";
import FlatIconButton from "../UI/FlatIconButton";
import TextUI from "../UI/TextUI";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import { ThemeContext } from "../../store/themeContext";
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShowExpiredActivitiesButton = ({ hideOld, setHideOld }) => {
  const themeCtx = useContext(ThemeContext);
  const color = themeCtx.currentTheme.colors;

  const setHideOldStore = async (data) => {
    try {
      await AsyncStorage.setItem("@hideOldKey", data.toString());
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <View style={styles.flatButton}>
      <FlatIconButton
        style={{ height: 46, overflow: "hidden" }}
        onPress={() => {
          setHideOld((prevState) => !prevState);
          setHideOldStore(!hideOld);
        }}
      >
        <View style={styles.flatButtonInner}>
          {hideOld ? (
            <>
              <Ionicons name="chevron-down" size={20} color={color.text} />
              <TextUI style={styles.buttonText}>Pokaż zakończone</TextUI>
            </>
          ) : (
            <>
              <Ionicons name="chevron-up" size={20} color={color.text} />
              <TextUI style={styles.buttonText}>Ukryj zakończone</TextUI>
            </>
          )}
        </View>
      </FlatIconButton>
    </View>
  );
};

export default ShowExpiredActivitiesButton;

const styles = StyleSheet.create({
  flatButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  flatButtonInner: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: "row",
    borderRadius: GlobalStyles.border.radius,
  },
  buttonText: {
    marginLeft: 8,
    fontWeight: "bold",
  },
});
