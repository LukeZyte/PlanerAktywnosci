import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useContext, useLayoutEffect, useState } from "react";
import { ActivitiesContext } from "../store/activitiesContext";
import { Ionicons } from "@expo/vector-icons";
import FlatButton from "../components/UI/FlatButton";
import { GlobalStyles } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { getFormattedDate } from "../scripts/dates";
import FlatIconButton from "../components/UI/FlatIconButton";
import AddActivity from "../components/Activities/AddActivity";

function AddActivityScreen(props) {
  const selectedActivityId = props.route.params?.editingId;
  const isEditing = !!selectedActivityId;

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !isEditing ? "Dodaj nową aktywność" : "Edycja aktywności",
    });
  }, [navigation]);

  return (
    <ScrollView>
      <AddActivity selectedActivityId={selectedActivityId} />
    </ScrollView>
  );
}

export default AddActivityScreen;
