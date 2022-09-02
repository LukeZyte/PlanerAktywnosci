import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ActivityItem from "./ActivityItem";
import { ActivitiesContext } from "../../store/activitiesContext";

function ActivitiesList() {
  const activitiesCtx = useContext(ActivitiesContext);

  return (
    <View style={styles.listContainer}>
      <FlatList
        keyExtractor={(item, index) => {
          return item.id;
        }}
        data={activitiesCtx.activities}
        renderItem={(itemData) => {
          return <ActivityItem {...itemData.item} />;
        }}
      />
    </View>
  );
}

export default ActivitiesList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 4,
  },
});
