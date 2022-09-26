import { Alert, StyleSheet, View } from "react-native";
import FlatIconButton from "../UI/FlatIconButton";
import TextUI from "../UI/TextUI";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";

const ShowExpiredActivitiesButton = ({ hideOld, setHideOld }) => {
  const { colors, border } = useTheme();

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
        <View style={[styles.flatButtonInner, { borderRadius: border.radius }]}>
          {hideOld ? (
            <>
              <Ionicons name="chevron-down" size={20} color={colors.text} />
              <TextUI style={styles.buttonText}>Pokaż zakończone</TextUI>
            </>
          ) : (
            <>
              <Ionicons name="chevron-up" size={20} color={colors.text} />
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
  },
  buttonText: {
    marginLeft: 8,
    fontWeight: "bold",
  },
});
