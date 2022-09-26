import { StyleSheet, View } from "react-native";
import FlatIconButton from "../../UI/FlatIconButton";
import TextUI from "../../UI/TextUI";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const DatePickerForm = ({
  dateNotChoosen,
  setDateNotChoosen,
  date,
  setDate,
  oldDate,
  isDatePickerVisible,
  setDatePickerVisibility,
}) => {
  const { colors } = useTheme();

  function dateHandler(date) {
    setDateNotChoosen(false);
    setDate({
      value: new Date(date).toLocaleDateString(),
      choosen: true,
    });
    setDatePickerVisibility(false);
  }

  return (
    <FlatIconButton
      onPress={() => setDatePickerVisibility(true)}
      style={{
        flexDirection: "row",
      }}
    >
      <View style={styles.sectionContainer}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="calendar" size={20} color={colors.text} />
          <TextUI style={styles.dateLabel}>
            {!date.choosen ? "Wybierz termin" : "Zmień termin"}
          </TextUI>
        </View>
        <View>
          {date.choosen && (
            <TextUI
              style={[
                styles.dateText,
                { color: colors.primary700 },
                oldDate ? { color: colors.wrong500 } : null,
              ]}
            >
              {dateText}
            </TextUI>
          )}
          {!date.choosen && (
            <TextUI
              style={[
                styles.dateMessageText,
                { color: colors.contentBg600 },
                dateNotChoosen && {
                  color: colors.wrong500,
                  fontWeight: "bold",
                },
              ]}
            >
              Nie wprowadzono terminu
            </TextUI>
          )}
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={dateHandler}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </FlatIconButton>
  );
};

export default DatePickerForm;

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  dateLabel: {
    fontSize: 16,
    marginLeft: 8,
    textAlignVertical: "center",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateMessageText: {
    fontSize: 16,
    // fontWeight: "bold",
  },
});
