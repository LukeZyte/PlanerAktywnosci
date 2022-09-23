import { StyleSheet, View } from "react-native";
import FlatIconButton from "../../UI/FlatIconButton";
import TextUI from "../../UI/TextUI";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../../store/themeContext";
import { useContext, useState } from "react";
import { GlobalStyles } from "../../../constants/styles";

const DatePickerForm = ({
  dateNotChoosen,
  setDateNotChoosen,
  date,
  setDate,
  oldDate,
  isDatePickerVisible,
  setDatePickerVisibility,
}) => {
  const themeCtx = useContext(ThemeContext);
  const color = themeCtx.currentTheme.colors;

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
          <Ionicons name="calendar" size={20} color={color.text} />
          <TextUI style={styles.dateLabel}>
            {!date.choosen ? "Wybierz termin" : "Zmień termin"}
          </TextUI>
        </View>
        <View>
          {date.choosen && (
            <TextUI
              style={[styles.dateText, oldDate ? styles.oldDateText : null]}
            >
              {dateText}
            </TextUI>
          )}
          {!date.choosen && (
            <TextUI
              style={[
                styles.dateMessageText,
                dateNotChoosen && {
                  color: color.wrong500,
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
    color: GlobalStyles.colors.primary700,
    fontSize: 16,
    fontWeight: "bold",
  },
  oldDateText: {
    color: GlobalStyles.colors.wrong500,
  },
  dateMessageText: {
    color: GlobalStyles.colors.contentBg600,
    fontSize: 16,
    // fontWeight: "bold",
  },
});
