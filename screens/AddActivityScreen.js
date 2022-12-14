import { ScrollView } from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AddActivity from "../components/Activities/AddActivityForm/AddActivity";

function AddActivityScreen({ route }) {
  const selectedActivityId = route.params?.editingId;
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
